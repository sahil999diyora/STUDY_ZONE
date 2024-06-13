var ADMIN = require('./admin.model')
var jwt = require('jsonwebtoken')
require('dotenv').config()
exports.Sequre = async function(req, res, next) {
  try {
    let token = req.headers.authorization
    if(!token){
        throw new Error("Please Attech token")
    }
    let decode = jwt.verify(token,process.env.adminSequre)
    let AdminVerify = await ADMIN.findById(decode.id)
    if(!AdminVerify){
        throw new Error("Admin Not Found")
    }
    next()  
  } catch (error) {
    res.status(404).json({
      status : "fail",
      message : error.message
    })
  }
}