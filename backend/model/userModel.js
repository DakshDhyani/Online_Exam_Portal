const mongoose = require("mongoose");
const { stringify } = require("querystring");
const userScehma = new mongoose.Schema(
    {
        name:{
            type:String ,
            required:true,
        },

        email:{
            type: String,
            required:true,
            unique: true,
        },

        password:{
            type: String,
            required:true,
        },

        isAdmin:{
            type:Boolean,
            default: false,
        },
    },
    {
        timestamps:true,
    }
);

// here users will be the collection name
const userModel = mongoose.model("users",userScehma);

module.exports = userModel;