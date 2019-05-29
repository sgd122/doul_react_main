const express = require("express");
 
const app = express();
 
app.use(express.static("dist"));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
 
 
app.get("/api/getUsername", (req, res) =>
  res.send("Hi!")
);



app.listen(8080, () => console.log("Listening on port 8080!"));