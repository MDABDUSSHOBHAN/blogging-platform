// import { jwt, JwtPayload } from 'jsonwebtoken';
import jwt, { JwtPayload } from 'jsonwebtoken'

import { NextFunction, request, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from '../app/modules/user/user.model';
import config from '../app/config';

const auth = (...requireRole:string[])=>{

  


    
   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization; // Correct property access

        console.log('this is from auth',authorization);

    //breaker 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization header is missing or malformed' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract token



        if (!token) {
            throw new Error("Authorization token is missing");
        }
        
       const decoded = jwt.verify(token,config.jwt_secret as string) as JwtPayload
       console.log(decoded);
    
       const {role} = decoded;
       const user = await User.findById(decoded.id); 
       //const user = await User.findOne({email});
       if(!user){
        throw new Error("User not found");
       }
       if(user.isBlocked){
        throw new Error("User is Blocked!");
       }
       if(requireRole && !requireRole.includes(role)){
        throw new Error("You are not Authorize");
       }
    
       req.user = decoded as JwtPayload
       
       if (!user || user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Admins only',
        });
      }


      req.user = user;
        next();
    });
    



}

export default auth;