import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenandsetcookie } from "../utils/generateToken.js";

// hàm đăng kí người dùng mới
export async function signup(req, res) {
  try {
    //Lấy dữ liệu từ body của request
    const { username, email, password } = req.body;

    // Kiểm tra nếu thiếu bất kỳ trường nào Trả về lỗi HTTP 400 (Bad Request)
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Regular Expression để kiểm tra định dạng email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra định dạng email
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Kiểm tra độ dài mật khẩu phải tối thiểu 6 ký tự
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Kiểm tra xem tên người dùng (username) đã tồn tại chưa
    const existingUserByName = await User.findOne({ username: username });
    if (existingUserByName) {
      return res.status(400).json({
        success: false,
        message: "User with this name already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10); // tạo mã hóahóa cho mật khẩu
    const hashedPassword = await bcryptjs.hash(password, salt);
    // bảo mật cho mật khẩu người dùng

    
    // Danh sách hình đại diện mặc định
    const PROFILE_PICS = ["/avatar1.png", "/avartar2.png", "/avatar3.png"];
    // Chọn ngẫu nhiên một hình từ danh sách trên
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Tạo người dùng mới (sử dụng model User)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    if (newUser) {
      generateTokenandsetcookie(newUser._id, res);
      res.status(201).json({
        success: true,
        user: {
          ...newUser._doc,
          password: "", // không trả về mật khẩu cho người dùng
        },
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }

    await newUser.save();
  } catch (error) {
    console.log("Error on signup", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// hàm đăng nhập người dùng
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email" });
    }

    const ispasswordValid = await bcryptjs.compare(password, user.password);
    
    if(!ispasswordValid){
      return res.status(400).json({success: false, message: "invalid password"});
    }

    generateTokenandsetcookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "", // không trả về mật khẩu cho người dùng
      },
    });
  } catch (error) {
    console.log("Error on login", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// hàm đăng xuất người dùng

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  
  } catch (error) {
    console.log("Error on logout", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
