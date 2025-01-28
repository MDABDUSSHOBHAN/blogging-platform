import { Response } from "express";
import { StatusCodes } from "http-status-codes";

type TSuccessResponse<T> = {
    success?: boolean;
    statusCode: number; // Fixed capitalization
    message: string;
    data?: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success ?? true, // Default to true if not provided
        message: data.message,
        statusCode: data.statusCode, // Fixed capitalization 
        data: data.data,
    });
};

export default sendResponse;
