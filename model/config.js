const mongoose = require("mongoose");



const userSchema=new mongoose.Schema({
  username:String,
  email:String,
  password:String,
})

const adminSchema=new mongoose.Schema({
  username:String,
  email:String,
  password:String
})

const User= mongoose.model('users',userSchema)
const Admin=mongoose.model('admins',adminSchema)

module.exports = {User,Admin}