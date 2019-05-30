// controller.js
const util     = require('../util');
/*******************************
* mysql setting
********************************/ 
var mysql = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
connection.connect();
/*******************************
* mysql setting
********************************/


/*******************************
* jwt setting
********************************/
let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");
/*******************************
* jwt setting
********************************/

// 토큰 생성
exports.tokenCreate = function(req, res){
  // default : HMAC SHA256
  let token = jwt.sign({
    id: req.query.userId,   // 토큰의 내용(payload)
    pw: req.query.userPw
  },
  secretObj.secret ,    // 비밀 키
  {
    expiresIn: '5m'    // 유효 시간은 5분
  });

  console.log(token);
  
  return token;
}

exports.login = function(req, res, next){

	var userId = req.query.userId;
    var userPw = req.query.userPw;
    
	connection.query('select * from g5_member  where mb_id=? and mb_email=?',[userId,userPw], function(err, rows, fields) {
	  if (!err){
	  	if (rows[0]!=undefined) {
		    console.log('The solution is: ', rows);

		    // 토큰생성
    		let token = exports.tokenCreate(req, res);

		    // 생성한 토큰을 쿠키에 저장
		    res.cookie("user", token);		    

		    // res.send(rows);
		    var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
	                'fields : ' + JSON.stringify(fields)  + '<br><br>' +
	                'token : ' + JSON.stringify(token);
	            // res.send(result);
	        res.json({
	        	token: token,
	        	rows:rows
	        });
        }else{
        	res.send('no data');
        }
	  }else{
	    console.log('Error while performing Query.', err);
	    res.send(err);
	  }
	});

}



exports.list = function(req, res, next){


	connection.query('select * from g5_member', function(err, rows, fields) {
	  if (!err){
	    if (rows[0]!=undefined) {
		    console.log('The solution is: ', rows);
		    // res.send(rows);
		    var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
	                'fields : ' + JSON.stringify(fields);
	            // res.send(result);
	        // res.json({
	        // 	rows:rows
	        // });

	        res.json(err||!rows? util.successFalse(err): util.successTrue(rows));
        }else{
        	res.send('no data');
        }
	  }else{
	    console.log('Error while performing Query.', err);
	    res.send(err);
	  }
	});

	// res.send('profile ok');

}

