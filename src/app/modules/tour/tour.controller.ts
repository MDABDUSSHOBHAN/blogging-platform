import { Request, Response } from 'express'
import { tourService } from './tour.service'
import sendResponse from '../../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../utils/catchAsync'
import jwt, { decode } from "jsonwebtoken"
import User from '../user/user.model'
// import User from '../user/user.model'
// import auth from '../../../middleware/auth'

const createTour = catchAsync(async (req, res)=>{

  //  const user = req.user;
//   const { title, content } = req.body;
 
//   const authorizationHeader = req.headers.authorization;


//   if (!authorizationHeader) {
//     return res.status(401).json({ success: false, message: 'Authorization header is missing or malformed' });
//   }

// console.log('Authorization Header:', authorizationHeader);

// // 1. Extract the token from the Authorization header
// const token = authorizationHeader.split(' ')[1]; // Split by space and get the second part

// console.log('Extracted Token:', token);

// if (!token) {
//   return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing' });
// }



// // 2. Verify the token and get the user ID
//       const decoded: any = jwt.verify(token, "secrect" as string);
//       const userId = decoded.id;
// console.log('fromDecoded',decoded);
// console.log('this is userId',userId);

// // auther 
//       const author = await User.findById(userId);

     // console.log('atther from createTour',author)

   

//this is for new
//user variable ar modhe amer sob data acehe... ja ami pacci vafyfy user thake...
const user = req.user; // User object from the middleware
const body = req.body;
const author = {
  _id: user?._id,
  email: user?.email,
};

// Merge body and author into a single update payload
const Payload = { ...body, author };

// const user = req.user; // User object from the middleware

// // const {_id,name,email,role} = user

// //testing-------
// const authorDetails = {
//   _id: user._id.toHexString(),  // Convert ObjectId to string
//   email: user.email,
//   role:user.role
// };


// // console.log('auther:',authorDetails);
// const { title, content } = req.body;

// if (!title || !content) {
//   return res.status(400).json({ success: false, message: 'Title and content are required' });
// }




  const result = await tourService.createTour(Payload)
  console.log(result);
  sendResponse(res,{
    statusCode:StatusCodes.CREATED,
    message: 'Tour created successfully',
    data:result
   })
})
  
  
  
// Here will implement query operation _________
const getTours = catchAsync(async (req: Request, res: Response)=>{



  const result = await tourService.getTours(req.query)
  
  sendResponse(res,{
    success: true,
    message: 'Blogs fetched successfully',
    statusCode:StatusCodes.OK,
 
    data:result
   })
}) 


const getSingleTour = catchAsync(async (req, res)=>{
  const id = req.params.id
  const result = await tourService.getSingleTour(id)
   sendResponse(res,{
    statusCode:StatusCodes.OK,
    message: 'Tours get successfully',
    data:result
   })
}) 

 
  


const updateTour = catchAsync(async (req, res) =>{

  const id = req.params.id
  const body = req.body

//implement auther
const user = req.user; // User object from the middleware

const author = {
  _id: user?._id,
  email: user?.email,
};

// Merge body and author into a single update payload
const updatePayload = { ...body, author };



// const {_id,name,email,role} = user


  const result = await tourService.updateTour(id, updatePayload)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message: 'Tour updated successfully',
    data:result
   })
})
 
  
const deleteTour =catchAsync( async (req, res) =>{
  const id = req.params.id
  const result = await tourService.deleteTour(id)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    message: 'Blog deleted successfully',

   })
} )

 
 

// another part of this project _________>> 

// const getNextSchedule = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id
//     const result = await tourService.getNextSchedule(id)

//     res.send({
//       success: true,
//       message: 'Tour deleted successfully',
//       result,
//     })
//   } catch (error) {
//    next(error)
//   }
// }

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  // getNextSchedule,
}

function next(error: unknown) {
  throw new Error('Function not implemented.')
}
