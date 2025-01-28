import { Router } from "express";
import { adminAction } from "./blog.controller";
import authenticateAdmin from "./authincatedAdmin";
import auth from "../../../middleware/auth";


//this is for adminAction 


const adminRouter = Router()

adminRouter.delete('/blogs/:id',auth("admin"), adminAction.deleteBlog);

adminRouter.patch('/users/:id/block',auth("admin"), adminAction.blockUser);


export const  adminRoue = adminRouter