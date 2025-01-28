import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../../middleware/auth'

const userRouter = Router()

userRouter.post('/create-admin', userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/',auth("admin","user"),userController.getUser)

export const UserRute = userRouter;






