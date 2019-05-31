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
const address = require('address');
const lanHost = address.ip();

exports.post_login = function(req, res, next){
	
	console.log("::lanHost::"+lanHost+"=>"+util.getServerIp(req));

	var userId = req.body.userId;
    var userPw = req.body.userPw;
    console.log(userId+"/"+userPw);
	connection.query('select * from g5_member  where mb_email=? and mb_no=?',[userId,userPw], function(err, rows, fields) {
	  if (!err){
	  	if (rows[0]!=undefined) {
		    console.log('The solution is: ', rows);

		    // 토큰생성
    		let token = util.tokenCreate(req, res, next);

		    // 생성한 토큰을 쿠키에 저장
		    res.cookie("jwt", token);		    
	           
	        // res.json({
	        // 	token: token,
	        // 	rows:rows
	        // });

	        res.json(err||!rows? util.successFalse(err): util.successTrue(rows));
        }else{
        	console.log("no data");
        	res.json(util.successFalse(null,null)); 
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
        	console.log("no data");
        	res.json(util.successFalse(null,null)); 
        }
	  }else{
	    console.log('Error while performing Query.', err);
	    res.send(err);
	  }
	});

	// res.send('profile ok');

}

