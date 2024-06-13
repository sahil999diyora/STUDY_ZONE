var CATAGORY = require('./catagory.model')
var SUBCATEGORY = require('../subCatagory/subcatagory.model')
var QUESTIONS = require('../questions/questions.model')

exports.catagoryCreate = async function (req, res, next) {
  try {

    req.body.categoryImage = req.files.map(el => el.filename)

    let catagoryData = await CATAGORY.create(req.body)

    res.status(201).json({
      status: "success",
      message: "catagory Create success",
      data: catagoryData
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.catagoryFind = async function (req, res, next) {
  try {
    if (req.query.search) {
      let catagoryDataSearch = await CATAGORY.find({ catagoryName: { $regex: req.query.search, $options: 'i' } })
      res.status(200).json({
        status: "success",
        message: "catagory Search success",
        data: catagoryDataSearch
      })
    } else {
      let catagoryData = await CATAGORY.find()

      res.status(200).json({
        status: "success",
        message: "catagory Found success",
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

exports.catagoryCount = async function (req, res, next) {
  try {

    let catagoryData = await CATAGORY.find().count()

    res.status(200).json({
      status: "success",
      message: "catagory Count success",
      data: catagoryData
    })

  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.catagoryDelete = async function (req, res, next) {
  try {
    let findcatagory = await CATAGORY.findById(req.params.id)

    if (!findcatagory) {
      throw new Error("Catagory is Already Delete")
    }


    // QUESTIONS DELETE

    let SUB_CATEGORIES_DATA = await SUBCATEGORY.find({ catagoryID: req.params.id })

    let SUB_CATEGORIES_ID = await SUB_CATEGORIES_DATA.map(SUB_CATE => SUB_CATE._id)

    await QUESTIONS.deleteMany({ subcatagoryID: { $in: SUB_CATEGORIES_ID } })

    // SUBCATEGORY DELETE

    await SUBCATEGORY.deleteMany({ catagoryID: req.params.id })

    // CATEGORY DELETE

    await CATAGORY.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "success",
      message: "catagory Delete success",
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}


exports.catagoryUpdate = async function (req, res, next) {
  try {

    if (req.files && req.files.length) {
      req.body.categoryImage = req.files.map(el => el.filename)
    }

    let CatagoryData = await CATAGORY.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
      status: "success",
      message: "catagory Update success",
      data: CatagoryData
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
}





