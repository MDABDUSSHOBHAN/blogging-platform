import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

//this is for global Error Handlermiddleware_______________]]



//this is for errorType

type TErrorResponse = {
    success: boolean,
    
    message:string,
    error:any
}





export const globalErrorHandler = (err:any, req:Request, res:Response, _next:Function) => {
    console.log(err); // Log the error for debugging purposes 
    // Send a generic error response

if(err instanceof mongoose.Error.CastError){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:`Any Error ${err.message}`,
        StatusCodes:400,
        //name:err.name,  //this is added
       
        error:err
      })
}

//validationError 
else if( err instanceof mongoose.Error.ValidationError){

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.message,
      //this is added
        StatusCodes:400,
       
        error:err
      })

}

//This is fro duplicate errorCode
else if (err.code && err.code === 11000){
    
    res.status(StatusCodes.BAD_REQUEST).json({
        success:false,
        message:'Validation error',
      //this is added
       StatusCodes:400,
      
        error:err
      })
}

    else if(err instanceof Error){
        console.log(err);

        res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
          //this is added
          // message:`Any Error ${err.message}`,
          message:'Validation error',
          StatusCodes:400,
            
            error:err
          })

    }
   
  }




