
//this is for authincting Admin 

import { NextFunction, Request, Response } from "express";

const authenticateAdmin = (req:Request, res:Response, next:NextFunction) => {
    const user = req.user;
  
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admins only',
      });
    }
  
    next();
  };

  export default authenticateAdmin



