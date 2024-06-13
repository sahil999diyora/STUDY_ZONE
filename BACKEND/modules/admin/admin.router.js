var express = require('express');
var router = express.Router();
var ADMINCONTROLLER = require('./admin.controller')

router.post('/signup',ADMINCONTROLLER.adminSignup);
router.post('/login',ADMINCONTROLLER.adminLogin);

module.exports = router;
