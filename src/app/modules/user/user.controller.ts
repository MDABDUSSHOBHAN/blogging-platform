import { StatusCodes } from 'http-status-codes';
// req and res manage

import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../../../utils/sendResponse'
import catchAsync from '../../../utils/catchAsync';

const createUser = catchAsync(async (req,res) =>{
   const payload = req.body
  const result = await userService.createUser(payload)
sendResponse(res,{
 statusCode:StatusCodes.CREATED,
 message: 'User created successfully',
 data:result
})}) 
  
 



const getUser = catchAsync(async(req, res) =>{
  const result = await userService.getUser()
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message: 'Users getting successfully',
    data:result
   })
})  

   
    
  


const getSingleUser = catchAsync(async(req,res)=>{
  console.log(req.params)
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message: 'Users getting successfully',
    data:result
   })
}) 

 
  


const updateUser = catchAsync(async(req,res)=>{
  const userId = req.params.userId
  const body = req.body
  const result = await userService.updateUser(userId, body)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message: 'Users updated successfully',
    data:result
   })
})

  

  


const deleteUser = catchAsync(async (req, res) =>{
  const userId = req.params.userId
  const result =   await userService.deleteUser(userId)
    sendResponse(res,{
      statusCode:StatusCodes.NO_CONTENT,
      message: 'Users deleted successfully',
      data:result
     })

}) 




export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}

function next(error: unknown) {
  throw new Error('Function not implemented.');
}
