import mongoose from "mongoose";
// tao user
const userSchema = new mongoose.Schema({
  username: { 
    type: String,
     required: true ,
     unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    Image:{
        type: String,
        default: '',
    },
    searchHistory:{
        type: Array,
        default: [],
    },
});

export const User = mongoose.model("User", userSchema); 
// user
