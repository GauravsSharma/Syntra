import type { Request, Response } from 'express';

export const generateRedirectUrl = async(req:Request,res:Response)=>{
    try {
        res.status(200).json({message:"Authenticated"})        
    } catch (error) {
        res.status(500).json({message:"Authentication failed",error})
    }
}