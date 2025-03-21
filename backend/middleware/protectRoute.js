import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'
import { ENV_VARS } from '../config/envVars.js';


// Kiểm tra xem người dùng có JWT Token hợp lệ không trước khi cho phép truy cập các route cần xác thực.
export const protectRoute = async(req, res, next) =>{
    try{
        const token = req.cookies['jwt-netflix']; // get token from cookie

        // không thấy tokentoken
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized to access this route"
            })
        }

        // token không được tìm thấy
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET); // decode token

        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"error - invalid token"
            })
        }

        
        const user = await User.findById(decoded.id).select("-password");;
        // không tìm thấy người dùng trong database
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        } // truyen user vao req
        
        req.user = user;

        next();
    }
    catch(err){
     console.log("Error in protectRoute: ", err.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}