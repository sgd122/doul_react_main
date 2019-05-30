const router = require('express').Router();
const controller = require('./controller');
const util     = require('../util');


router.post('/login',controller.login);
router.get('/list',util.isLoggedin,controller.list);

module.exports = router;
