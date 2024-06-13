var SUBCATAGORY = require('./subcatagory.model')
var QUESTIONS = require('../questions/questions.model')
exports.subcatagoryCreate = async function (req, res, next) {
  try {

    req.body.subCategoryImage = req.files.map(el => el.filename)


    let catagoryData = await SUBCATAGORY.create(req.body)
    res.status(201).json({
      status: "success",
      message: "sub-catagory Create success",
      data: catagoryData
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.subcatagoryFind = async function (req, res, next) {
  try {
    if (req.query.search) {
      let catagoryDataSearch = await SUBCATAGORY.find({ catagoryName: { $regex: req.query.search, $options: 'i' } }).populate('catagoryID')
      res.status(200).json({
        status: "success",
        message: "sub-catagory Search success",
        data: catagoryDataSearch
      })
    } else {
      let catagoryData = await SUBCATAGORY.find().populate('catagoryID')
      res.status(200).json({
        status: "success",
        message: "sub-catagory Found success",
        data: catagoryData
      })
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.subcatagoryCount = async function (req, res, next) {
  try {

    let catagoryData = await SUBCATAGORY.find().count()
    res.status(200).json({
      status: "success",
      message: "sub-catagory Count success",
      data: catagoryData
    })

  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.subcatagoryDelete = async function (req, res, next) {
  try {
    let findcatagory = await SUBCATAGORY.findById(req.params.id)
    if (!findcatagory) {
      throw new Error("sub-catagory is Already Delete")
    }
    await SUBCATAGORY.findByIdAndDelete(req.params.id)

    await QUESTIONS.deleteMany({ subcatagoryID: req.params.id })

    res.status(200).json({
      status: "success",
      message: "sub-catagory Delete success",
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.subcatagoryUpdate = async function (req, res, next) {
  try {

    if (req.files && req.files.length) {
      req.body.subCategoryImage = req.files.map(el => el.filename)
    }

    let CatagoryData = await SUBCATAGORY.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      status: "success",
      message: "sub-catagory Update success",
      data: CatagoryData
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}





