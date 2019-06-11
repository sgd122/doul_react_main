// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http');
const path = require("path");
const cors = require("cors");
var serveStatic = require('serve-static');      //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
const cookieParser = require('cookie-parser');


const clientApp = path.join(__dirname, '../docs/export');

/****************************
* 포트설정
*****************************/ 
app.set('port', 8080);
/****************************
* 포트설정
*****************************/ 


/****************************
* 사용 기본설정
*****************************/ 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// app.use(cors());
app.use(cookieParser());
app.use(function(req, res, next) { 
// app.all('/*', function(req, res, next) {	
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  //   // res.send();

  // next();

  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
/****************************
* 사용 기본설정
*****************************/ 


/****************************
* 경로설정
*****************************/ 
app.use('/backend', require('./routes/index')); // api 라우팅처리 후
// app.use('*', express.static(clientApp)); // 모든 요청을 프론트엔드 정적 파일이 처리

//join은 __dirname : 현재 .js 파일의 path 와 public 을 합친다
//이렇게 경로를 세팅하면 public 폴더 안에 있는것을 곧바로 쓸 수 있게된다
app.use(serveStatic(path.join(__dirname, './../docs/export')));
/****************************
* 경로설정
*****************************/ 


// app.use(
//     function (req, res, next) {
//         // console.log('middle wared was called : first');
//         //res.redirect('http://google.co.kr');
 
//         //req 여러 정보를 얻어 올 수 있는데 그중
//         //요청받은 request 정보중에서 User-Agent 정볼를 따로 분리하여 갖어올 수 있다
//         var userAgent = req.header('User-Agent');
 
//         //요청파라미터는 get 방식인 req.query 에 들어오게 된다
//         //post 방식은 body로 들어오게된다
//         //name 은 정해져있는 명칭
//         var paramName = req.query.name;
 
//         //응답 보내기
//         res.send('<h3>response from server! :<br/> ' + userAgent + '<br/>[' + paramName  + '] </h3>');

 
//     }
// );


//웹서버를 app 기반으로 생성
var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        console.log('express 웹서버 실행' + app.get('port'));
    }
 
);

//클라이언트 연결 이벤트 처리
appServer.on('connection', function(socket){
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

//서버 종료 이벤트 처리
appServer.on('close', function(){
    console.log('서버가 종료됩니다.');
});

// app.listen(8080, () => console.log("Listening on port 8080!"));