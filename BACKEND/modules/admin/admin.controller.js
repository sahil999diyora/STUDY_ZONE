var ADMIN = require('./admin.model')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()
exports.adminSignup = async function(req, res, next) {
  try {
    req.body.password = await bcrypt.hash(req.body.password,10)
    let AdminData = await ADMIN.create(req.body)
    res.status(201).json({
      status : "success",
      message : "Admin Create success",
      data :AdminData 
    })
  } catch (error) {
    res.status(404).json({
      status : "fail",
      message : error.message
    })
  }
}

exports.adminLogin = async function(req, res, next) {
  try {
    let AdminData = await ADMIN.findOne({email : req.body.email})
    if(!AdminData){
      throw new Error("Admin Not Found")
    }
    let AdminPassword = await bcrypt.compare(req.body.password,AdminData.password)
    if(!AdminPassword){
      throw new Error("Password Invalid")
    }
    let token = jwt.sign({id : AdminData._id},process.env.adminSequre)
    res.status(200).json({
      status : "success",
      message : "Admin login success",
      data :AdminData ,
      token
    })
  } catch (error) {
    res.status(404).json({
      status : "fail",
      message : error.message
    })
  }
}




