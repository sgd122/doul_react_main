// index.js
const express = require('express');
const app = express();
var http = require('http');
const path = require("path");
var serveStatic = require('serve-static');      //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할


const clientApp = path.join(__dirname, '../docs/export');

app.set('port', 8080);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

console.log(clientApp);
app.use('/backend', require('./routes/index')); // api 라우팅처리 후
// app.use('*', express.static(clientApp)); // 모든 요청을 프론트엔드 정적 파일이 처리

//join은 __dirname : 현재 .js 파일의 path 와 public 을 합친다
//이렇게 경로를 세팅하면 public 폴더 안에 있는것을 곧바로 쓸 수 있게된다
app.use(serveStatic(path.join(__dirname, './../docs/export')));


///users 를 붙이게 되면 특정 경로를 지정하는 것으로 특정 기능을 수행할떄 사용한다
//localhost:3000/users
//example , get 방식
//localhost:3000/users?name=tesstsssssss
 

app.use(
    function (req, res, next) {
        // console.log('middle wared was called : first');
        //res.redirect('http://google.co.kr');
 
        //req 여러 정보를 얻어 올 수 있는데 그중
        //요청받은 request 정보중에서 User-Agent 정볼를 따로 분리하여 갖어올 수 있다
        var userAgent = req.header('User-Agent');
 
        //요청파라미터는 get 방식인 req.query 에 들어오게 된다
        //post 방식은 body로 들어오게된다
        //name 은 정해져있는 명칭
        var paramName = req.query.name;
 
        //응답 보내기
        res.send('<h3>response from server! :<br/> ' + userAgent + '<br/>[' + paramName  + '] </h3>');

 
    }
);


//웹서버를 app 기반으로 생성
var appServer = http.createServer(app);
appServer.listen(app.get('port'),
    function () {
        console.log('express 웹서버 실행' + app.get('port'));
    }
 
);

// app.listen(8080, () => console.log("Listening on port 8080!"));