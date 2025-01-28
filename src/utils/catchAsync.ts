import { NextFunction, RequestHandler } from "express"
import { Request, Response } from "express-serve-static-core"
//heigher order function HOC...____________________________>>
const catchAsync = (func:RequestHandler) =>{

    return (req:Request,res:Response,next:NextFunction) =>{
        Promise.resolve(func(req,res,next)).catch((error) =>{next(error)})
    }
}

export default catchAsync;