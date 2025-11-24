import type { Response } from "express";
import Job from "../models/Job.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import Application from "../models/Application.js";
import cloudinary from "../config/cloudinary.js";

export const createJob = async (req: AuthRequest, res: Response) => {
    try {
        const job = await Job.create({...req.body, employerId: req.user.id});
        res.status(201).json(job);
    } catch(e){
        res.status(500).json({message: 'Server Error', e});
    }
};

export const getJobs = async (req: AuthRequest, res: Response) => {
    try {
        const {search, location, type, page = 1, limit = 10, salary} = req.query;
        const query: any = {status: 'open'};
        if(search){
            query.$text = {$search: search as string};
        }
        if(location){
            query.location = {$regex: location, $options: 'i'};
        }
        if(type){
            query.type = type;
        }
        if(salary){
            query.salaryRange = {$regex: salary, $options: 'i'};
        }

        //pagination
        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;
        const skip = (pageNum -1) * limitNum;

        const totalJobs = await Job.countDocuments(query);

        const jobs = await Job.find(query)
      .populate('employerId', 'name company') // Show company name
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limitNum);

       res.json({
        jobs,
        pagination: {
            total: totalJobs,
            page: pageNum,
            pages: Math.ceil(totalJobs/limitNum),
        }
     });
    } catch(e) {
        res.status(500).json({message: 'Server Error', e});
    }
};

export const getJobApplications = async (req: AuthRequest, res: Response) => {
    try {
        const jobId = req.params.id as string;

        const applications = await Application.find({
            jobId,
            status: {$ne: 'withdrawn'}

        }).populate('candidateId', 'name email');
        const applicationswithUrls = applications.map((app: any) => {
            const appObj = app.toObject();

            if(app.resumePublicId) { // generate link
                appObj.resumeUrl = cloudinary.utils.url(app.resumePublicId, {
                    resource_type: 'raw',
                    type: 'private',
                    sign_url: true,
                    expires_at: Math.floor(Date.now() /1000) + 3600,
                });
            }
            return appObj;
        });

        res.json(applicationswithUrls);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Error', err});
    }
}

export const getEmployerJobs = async (req: AuthRequest, res: Response) => {
    try {
        const jobs = await Job.find({employerId: req.user.id});
        res.json(jobs);
    } catch(err) {
        res.status(500).json({ message: 'unable to get Jobs', err });
    }
};

export const updateJobs = async (req: AuthRequest, res: Response) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        
        if (job.employerId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedJob);
    } catch(err){
        res.status(500).json({ message: 'unable to update jobs: ', err });
    }
}

export const deleteJob = async (req: AuthRequest, res: Response) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({ message: 'Job not found' });

        if(job.employerId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch(err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
    try {
        const job = await Job.findById(req.params.id).populate('employerId', 'name company');
        if (!job) {
        return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job); 
    } catch(err) {
        res.status(500).json({ message: 'server error', err });
    }
}


