import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcrypt';
import config from '../../config';

// const userSchema = new Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, 'Please provide your name'],
//     minlength: 3,
//     maxlength: 50,
//   },
//   age: { type: Number, required: [true, 'Please enter your age'] },
//   email: {
//     type: String,
//     required: [true, 'Please provide your email'],
//     unique: true,
//     validate: {
//       validator: function (value: string) {
//         return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
//       },
//       message: '{VALUE} is not a valid email',
//     },
//     immutable: true,
//   },
//   password:{
//     type:String,
//     required:true
//   },
//   photo: String,
//   role: {
//     type: String,
//     enum: {
//       values: ['user', 'admin'],
//       message: '{VALUE} is not valid, please provide a valid role',
//     },
//     default: 'user',
//     required: true,
//   },
//   userStatus: {
//     type: String,
//     enum: ['active', 'inactive'],
//     required: true,
//     default: 'active',
//   },
// })

//Here is the logic for password Hassing


//

const userSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


userSchema.pre("save",async function(next){
const user = this as unknown as IUser;
user.password = await bcrypt.hash(user.password,Number(config.salt_round));
next();
});
;


userSchema.post('save', function (doc, next) {
  doc.password = ' '; // Set password to undefined for the document in memory
  next();
});






const User = model<IUser>('User', userSchema)
export default User