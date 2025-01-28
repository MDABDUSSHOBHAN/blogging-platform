
import config from "../../config";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interfae";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const register = async(payload:IUser) =>{

    const result = await User.create(payload);
    return result;
}


//this is for login 
const login = async(payload:ILoginUser) =>{

//amake check korte hobe user and email ache kina??
const user = await User.findOne({email:payload?.email});

if(!user){

    throw new Error("User not found!!");
}

//Is user active??
// const userStatus = user?.userStatus;

// if(userStatus==='inactive'){

//     throw new Error('sorry! user is inActive');
// }

const isPasswordMatch = await bcrypt.compare(payload.password,user?.password);

if(!isPasswordMatch){
    throw new Error("password do not match");
}



//Here will be generate json webToken
const token = jwt.sign({email:user?.email,role:user?.role,id:user?._id},config.jwt_secret as string,{expiresIn:'10d'});



//extra
// const token = jwt.sign(
//     { userId: user._id }, // payload
//     "secrect", // secret key
//     { expiresIn: '1h' } // optional expiration
//   );


    // const result = await User.create(payload);
    return {
        token
    };
}


export const AuthService = {
    register,
    login
}