import type { Response } from "express";
import Job from "../models/Job.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

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
