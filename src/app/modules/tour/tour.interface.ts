// import { HydratedDocument, Model } from 'mongoose'



// export interface ITour {
//   name: string
//   durationHours: number
//   averageRating: number
//   price: number
//   coverImage: string
//   images: string[]
//   startDates: Date[]
//   startLocation: string
//   locations: string[]
//   slug: string,
//   availableSeats:number,
// }

// export interface ITourMethods {
//   getNextNearestStartDateAndEndData(): {
//     nearestStartDate: Date | null
//     estimatedEndDate: Date | null
//   }
// }

// interface TTourModel
//   extends Model<ITour, Record<string, unknown>, ITourMethods> {
//   startDates: Date[]
//   durationHours: number
//   getNextNearestStartDateAndEndData(): Promise<
//     HydratedDocument<ITour, ITourMethods>
//   >
// }

// export default TTourModel


import { Types,Document  } from "mongoose";


// Blog interface
export interface IBlog extends Document{
  title: string; // The title of the blog post
  content: string; // The main body or content of the blog post
  author: Types.ObjectId; // A reference to the User model, indicating the author of the blog post
  isPublished?: boolean; 
 
}