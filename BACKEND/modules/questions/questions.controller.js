var QUESTIONS = require('./questions.model')
const csv = require('csv-parser');
const fs = require('fs');



exports.questionsCreate = async function (req, res, next) {
  try {
    console.log(req.body);
    let catagoryData = await QUESTIONS.create(req.body)
    res.status(201).json({
      status: "success",
      message: "questions Create success",
      data: catagoryData
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.questionsFind = async function (req, res, next) {
  try {

    let catagoryData = await QUESTIONS.find().populate({
      path: 'subcatagoryID',
      populate: {
        path: 'catagoryID',
        model: 'catagory'
      }
    })
    res.status(200).json({
      status: "success",
      message: "questions Found success",
      data: catagoryData
    })

  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.questionsCount = async function (req, res, next) {
  try {

    let catagoryData = await QUESTIONS.find().count()
    res.status(200).json({
      status: "success",
      message: "questions Count success",
      data: catagoryData
    })

  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.questionsDelete = async function (req, res, next) {
  try {
    let findcatagory = await QUESTIONS.findById(req.params.id)
    if (!findcatagory) {
      throw new Error("questions is Already Delete")
    }
    await QUESTIONS.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
      message: "questions Delete success",
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.questionsUpdate = async function (req, res, next) {
  try {
    let CatagoryData = await QUESTIONS.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      status: "success",
      message: "questions Update success",
      data: CatagoryData
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}





