var express = require('express');
var router = express.Router();
var QUESTIONSCONTROLLER = require('./questions.controller')
var ADMINSEQURE = require("../admin/admin.middleware")

router.post('/create',ADMINSEQURE.Sequre,QUESTIONSCONTROLLER.questionsCreate);
router.get('/',ADMINSEQURE.Sequre,QUESTIONSCONTROLLER.questionsFind);
router.get('/count',ADMINSEQURE.Sequre,QUESTIONSCONTROLLER.questionsCount);
router.delete('/:id',ADMINSEQURE.Sequre,QUESTIONSCONTROLLER.questionsDelete);
router.patch('/:id',ADMINSEQURE.Sequre,QUESTIONSCONTROLLER.questionsUpdate);

module.exports = router;
