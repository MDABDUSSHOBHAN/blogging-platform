import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import  { UserRute } from './app/modules/user/user.route';
import { tourRoute } from './app/modules/tour/tour.route';
import { globalErrorHandler } from './middleware/globalErrorhandler';
import { authRoute } from './app/modules/auth/auth.route';
import { adminRoue } from './app/modules/blog/blog.route';
import { StatusCodes } from 'http-status-codes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());



//this is for user route
app.use('/api/user',UserRute);

//this is for tourRoute 
app.use('/api/blogs',tourRoute);



//this is for userRegister
app.use('/api/auth/',authRoute)


//this is for adminRoute
app.use('/api/admin',adminRoue)




//globel error Handler midelware 
app.use(globalErrorHandler);

//if any route not found!!
app.use("*",(req:Request,res:Response)=>{
  res.status(StatusCodes.NOT_FOUND).json({
    status:false,
    message:'Route not found',
  })
})




export default app;
