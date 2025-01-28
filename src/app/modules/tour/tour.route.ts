import { Router } from 'express'
import { tourController } from './tour.controller'
import { verifyToken } from '../../../middleware/veryfyToken'
import auth from '../../../middleware/auth'
// import auth from '../../../middleware/auth'


const tourRouter = Router()

// tourRouter.get('/schedule/:id', tourController.getNextSchedule)
tourRouter.get('/', tourController.getTours)
tourRouter.get('/:id',verifyToken, tourController.getSingleTour)

tourRouter.post('/',verifyToken,tourController.createTour)
tourRouter.patch('/:id',verifyToken, tourController.updateTour)
tourRouter.delete('/:id',verifyToken, tourController.deleteTour)
//ex
//userRouter.get('/',auth("admin","user"),userController.getUser)
export const tourRoute =  tourRouter;