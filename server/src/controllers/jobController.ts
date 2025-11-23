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
        const jobs = await Job.find({status: 'open'}).populate('employerId', 'name company');
        res.json(jobs);
    } catch(e) {
        res.status(500).json({message: 'Server Error', e});
    }
};

export const getJobApplications = async (req: AuthRequest, res: Response) => {
    try {
        const jobId = req.params.id as string;

        const applications = await Application.find({jobId}).populate('candidateId', 'name email');
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