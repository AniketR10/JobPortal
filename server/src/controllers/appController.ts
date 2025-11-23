import type {Response} from 'express';
import Application from '../models/Application.js';
import cloudinary from '../config/cloudinary.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { buffer } from 'stream/consumers';
import { resolve } from 'path';
import { rejects } from 'assert';
import { error } from 'console';

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