//util.js

var jwt = require('jsonwebtoken');
let secretObj = require("./config/jwt");
var os = require('os');
const address = require('address');
const lanHost = address.ip();
var util = {};


util.getServerIp = function(req){ //1 
    var ipAddress;

    if(!!req.hasOwnProperty('sessionID')){
        ipAddress = req.headers['x-forwarded-for'];
    } else{
        if(!ipAddress){
            var forwardedIpsStr = req.header('x-forwarded-for');

            if(forwardedIpsStr){
                var forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if(!ipAddress){
                ipAddress = req.connection.remoteAddress;
            }
        }
    }
    return ipAddress;
};


util.successTrue = function(data){ //1   
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

util.successFalse = function(err, message){ //2
  if(!err&&!message) message = '데이터가 존재하지 않습니다.';
  return {
    success:false,
    message:message,
    errors:(err)? util.parseError(err): null,
    data:null
  };
};

util.parseError = function(errors){ //3
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'This username already exists!' };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};

// middlewares
util.isLoggedin = function(req,res,next){ //4
  // var token = req.headers['x-access-token'];
  let token = req.cookies.jwt;
  if (!token){ 
  	// return res.json(util.successFalse(null,'token is required!'));  	
  	console.log("token is required!");
  	if(util.getServerIp(req) == "::1"){	//로컬호스트 예외처리
		console.log("localhost");  	
		req.decoded = {};
		req.decoded.id = "sgd0947@gmail.com";
		req.decoded.pw = "2"; 
		next();
	
	}else{
		return res.json(util.successFalse(null,'token is required!'));  	
	}
  }else {    
    jwt.verify(token, secretObj.secret, function(err, decoded) {
		if(err){
			console.log(util.successFalse(err));
			if(util.getServerIp(req) == "::1"){	//로컬호스트 예외처리
				console.log("localhost");  	
				req.decoded = {};
				req.decoded.id = "sgd0947@gmail.com";
				req.decoded.pw = "2"; 
				next();
			}else{				
				return res.json(util.successFalse(err));
			}
		}else{
			req.decoded = decoded;

			/******************
			* 토큰 기간갱신
			*******************/ 
			// 토큰생성
    		let token = util.tokenRefresh(req, res, next);

		    // 생성한 토큰을 쿠키에 저장
		    res.cookie("jwt", token);		    
		    /******************
			* 토큰 기간갱신
			*******************/ 

			console.log("권한이 있어서 API 수행 가능");
			console.log(decoded);
			// return true;
			
			next();
		}
	});
  }
  
};

// 토큰 생성
util.tokenCreate = function(req,res,next){
  // default : HMAC SHA256
  let token = jwt.sign({
    id: req.body.userId,   // 토큰의 내용(payload)
    pw: req.body.userPw
  },
  secretObj.secret ,    // 비밀 키
  {
    expiresIn: '50m'    // 유효 시간은 50분
  });
  
  return token;
}

// 토큰 기간연장
util.tokenRefresh = function(req,res,next){
  // default : HMAC SHA256
  let token = jwt.sign({
    id: req.decoded.id,   // 토큰의 내용(payload)
    pw: req.decoded.pw
  },
  secretObj.secret ,    // 비밀 키
  {
    expiresIn: '50m'    // 유효 시간은 50분
  });
  
  return token;
}

module.exports = util;