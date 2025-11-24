import type {Response} from 'express';
import Application from '../models/Application.js';
import cloudinary from '../config/cloudinary.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { buffer } from 'stream/consumers';
import { resolve } from 'path';
import { rejects } from 'assert';
import { error } from 'console';
import { stat } from 'fs';
import { sendEmail } from '../utils/emailService.js';
import User from '../models/User.js';
import Job from '../models/Job.js';

//helper
const cloudinaryUpload = (buffer: Buffer): Promise<any> => {
    return new Promise((resolve, rejects) => {
        const uploadFile = cloudinary.uploader.upload_stream({
            resource_type: 'raw',
            type: 'private',
            folder: 'resume-list'
        },
        (error, result) => {
            if(error) rejects(error);
            else resolve(result);
        }
    );
    uploadFile.end(buffer);
    })
};

export const applyJob = async (req:AuthRequest, res: Response) => {
    try {
        if(!req.file){
            return res.status(400).json({message: 'Resume is required'})
        }
        const {jobId} = req.body;

        // upload to cloudinary
        const uploadToCloud = await cloudinaryUpload(req.file.buffer);

        // save to db
        const application = await Application.create({
            jobId,
            candidateId: req.user.id,
            resumeUrl: uploadToCloud.secure_url,
            resumePublicId: uploadToCloud.public_id,
            status: 'applied'
        });

        // notify candidate
        const notifyCandidate = await User.findById(req.user.id);
        if(notifyCandidate){
             sendEmail(
                notifyCandidate.email,
                'Application Received',
                `You have successfully applied for the job. Good luck!`,
            )
        }

        // notify employer
        const job = await Job.findById(jobId).populate('employerId');
        if(job && job.employerId) {
            const employerEmail = (job.employerId as any).email;
            if(employerEmail){
                 sendEmail(
                    employerEmail,
                    'New Candidate Applied',
                    `A new candidate has applied for the position: ${job.title}`
                )
            }
        }

        res.status(201).json({message: 'Successfully applied', application})
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Server error', err});
    }
};

export const getApplications = async (req: AuthRequest, res: Response) => {
    try {
        const data = await Application.find({candidateId: req.user.id}).populate('jobId');
        res.json(data);
    } catch(err) {
        res.status(500).json({ message: 'error finding your applcations' });
    }
}

export const updateStatus = async (req: AuthRequest, res: Response) => {
    try {
        const {status} = req.body;
        const application = await Application.findById(req.params.id)
        .populate('candidateId')
        .populate('jobId');
        if(!application) return res.status(404).json({ message: 'Application not found' });

         const statusOrder = ['applied', 'screening', 'interview', 'offer', 'rejected'];
        
        const currentStatus = application.status as string;
        const currentIndex = statusOrder.indexOf(currentStatus);
        const newIndex = statusOrder.indexOf(status);

        if (newIndex < currentIndex && (currentStatus === 'rejected' || currentStatus === 'offer')) {
            return res.status(400).json({ 
                message: `Warning: You cannot revert the status from '${currentStatus}' back to '${status}'.` 
            });
        }

        application.status = status;
        await application.save();

        const candidate = application.candidateId as any;
        const job = application.jobId as any;

        if(candidate && candidate.email){
            await sendEmail(
                candidate.email,
                'Application Status Update',
                `Your application for ${job.title} has moved to: ${status.toUpperCase()}.`
            );
        }
        res.json(application);
    } catch(err){
        res.status(500).json({ message: 'unable to update the status: ', err });
    }
}

export const withdrawApplication = async (req: AuthRequest, res: Response) => {
    try {
        const application = await Application.findOne({_id: req.params.id, candidateId: req.user.id});
        if(!application) return res.status(404).json({ message: 'Application not found' });

        //delete
        await application.deleteOne();
        res.json({message: 'Application withdrawn'});
    } catch(err){
        res.status(500).json({ message: 'unable to withdraw the application' });
    }
}

export const getEmployerApplications = async (req: AuthRequest, res: Response) => {
    try {
       
        const jobs = await Job.find({ employerId: req.user.id }).select("_id");

        if (jobs.length === 0) {
            return res.json([]); 
        }

        const jobIds = jobs.map(j => j._id);

       
        const applications = await Application.find({ jobId: { $in: jobIds } })
            .populate("candidateId", "name email")
            .populate("jobId", "title");

        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while fetching employer applications" });
    }
};
