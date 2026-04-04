
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
    
   } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({message:"Authentication failed",error}, {status:500})
   }
}