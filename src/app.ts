import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import  { UserRute } from './app/modules/user/user.route';
import { tourRoute } from './app/modules/tour/tour.route';

import { globalErrorHandler } from './middleware/globalErrorhandler';
import { authRoute } from './app/modules/auth/auth.route';
import { adminRoue } from './app/modules/blog/blog.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
 //app.use('/api/v1/students', StudentRoutes);

//this is for user route
app.use('/api/user',UserRute);

//this is for tourRoute 
app.use('/api/blogs',tourRoute);



//this is for userRegister
app.use('/api/auth/',authRoute)


//this is for adminRoute
app.use('/api/admin',adminRoue)


const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

//this is for testing parpus

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', getAController);




//globel error Handler midelware 
app.use(globalErrorHandler);

//if any route not found!!
app.use("*",(req:Request,res:Response)=>{
  res.status(404).json({
    status:false,
    message:'Route not found',
  })
})




export default app;
