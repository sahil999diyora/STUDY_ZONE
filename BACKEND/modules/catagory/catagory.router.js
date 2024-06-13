var express = require('express');
var router = express.Router();
var CATAGORYCONTROLLER = require('./catagory.controller')
var ADMINSEQURE = require("../admin/admin.middleware")
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/category')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/create', upload.array('categoryImage', 10), ADMINSEQURE.Sequre, CATAGORYCONTROLLER.catagoryCreate);
// router.post('/create', ADMINSEQURE.Sequre, CATAGORYCONTROLLER.catagoryCreate);
router.get('/', ADMINSEQURE.Sequre, CATAGORYCONTROLLER.catagoryFind);
router.get('/count', ADMINSEQURE.Sequre, CATAGORYCONTROLLER.catagoryCount);
router.delete('/:id', ADMINSEQURE.Sequre, CATAGORYCONTROLLER.catagoryDelete);
router.patch('/:id', upload.array('categoryImage', 10), ADMINSEQURE.Sequre, CATAGORYCONTROLLER.catagoryUpdate);

module.exports = router;
