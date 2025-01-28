import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const register = catchAsync( async(req:Request,res:Response)=>{

    const result = await AuthService.register(req.body);
    const { _id, name, email } = result;
    sendResponse(res,{
        success:true,
        message:"User registered successfully",
        statusCode:StatusCodes.CREATED, 
        data: { _id, name, email },
    })
})


//this is for loginRoute
const login = catchAsync( async(req:Request,res:Response)=>{

    const result = await AuthService.login(req.body);
    sendResponse(res,{
        success:true,
        message:"Login successful",
        statusCode:StatusCodes.OK,
     
        data:result,
    })
})







export const AuthController = {
    register,
    login
}