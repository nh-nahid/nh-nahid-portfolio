import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";


interface JwtPayload {
  id: string;
  email: string;
  role: string;
}


export const checkLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });

    }


    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET
    ) as JwtPayload;



    req.user = decoded;


    next();


  } catch(error){

    return res.status(401).json({
      success:false,
      message:"Invalid or expired access token",
    });

  }

};