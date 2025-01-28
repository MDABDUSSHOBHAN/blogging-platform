import { NextFunction, Request, Response } from "express";
import User from "../app/modules/user/user.model";
import jwt from 'jsonwebtoken';
import config from "../app/config";


// Define the token payload structure
interface DecodedToken {
  id: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'authorization header is missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; // Extract token

  try {
    // Decode and verify token
    const decoded = jwt.verify(token,config.jwt_secret as string ) as DecodedToken;

    if (!decoded || !decoded.id) {
      return res.status(403).json({ success: false, message: 'Invalid token payload' });
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};
