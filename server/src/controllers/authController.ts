import type { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// register
export const register = async (req: Request, res: Response) => {
    try {
        const {name, email, password, role} = req.body;

         if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // if user exists
        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400).json({message: 'user already exists!'});
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        res.status(201).json({message: 'user registered successfully'});
    } catch(e){
        res.status(500).json({message: 'Server error', e});
    }
};

// login user
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password required"});
        }

        // check
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: 'User does not exist, please Register as new User'});
            return;
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({message: 'Invalid password'});
            return;
        }

        // jwt
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET as string,
            {expiresIn: '1d'}
        );

       return res.json({
            token,
            user: {
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role
            }
        });
    } catch(e){
        res.status(500).json({message: 'Server error', e});
    }
};