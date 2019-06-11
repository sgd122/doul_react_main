const router = require('express').Router();
const controller = require('./controller');
const util     = require('../util');

/* 토큰 미필요*/
router.post('/login',controller.post_login);

/* 토큰 미필요*/

/* 토큰 필요*/
router.get('/profile',util.isLoggedin,controller.profile);
router.post('/profile',util.isLoggedin,controller.profile);
router.get('/list',util.isLoggedin,controller.list);

/* 토큰 필요*/
module.exports = router;
