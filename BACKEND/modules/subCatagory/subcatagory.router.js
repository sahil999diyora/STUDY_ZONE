var express = require('express');
var router = express.Router();
var SUBCATAGORYCONTROLLER = require('./subcatagory.controller')
var ADMINSEQURE = require("../admin/admin.middleware")
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/subcategory')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
// router.post('/create',ADMINSEQURE.Sequre,SUBCATAGORYCONTROLLER.subcatagoryCreate);
router.post('/create',upload.array('subCategoryImage', 10),ADMINSEQURE.Sequre,SUBCATAGORYCONTROLLER.subcatagoryCreate);
router.get('/',ADMINSEQURE.Sequre,SUBCATAGORYCONTROLLER.subcatagoryFind);
router.get('/count',ADMINSEQURE.Sequre,SUBCATAGORYCONTROLLER.subcatagoryCount);
router.delete('/:id',ADMINSEQURE.Sequre,SUBCATAGORYCONTROLLER.subcatagoryDelete);
router.patch('/:id',upload.array('subCategoryImage', 10),ADMINSEQURE.Sequre,SUBCATAGORYCONTROLLER.subcatagoryUpdate);

module.exports = router;
