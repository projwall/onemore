const express = require ("express");
const bodyParser = require("body-parser");
const request = require ("request");
const https= require ("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

var first= req.body.fName;
var second= req.body.lName;
var email = req.body.email;
var data = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_field: [{
      FNAME: first,
      LNAME: second,
    }]
  }]
}
var jsonData= JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/6d32f788b4";
const options = {
  method: "POST",
  auth: "projwall:d502791e7124aab440bb82b0850e6da7-us17"
}

const request= https.request (url, options, function(response){

  if (response.statusCode===200)
  {
      res.sendFile(__dirname + "/fail.html");}
  else {
    res.send("Not successfull");
  }
  response.on("data", function(data){
    console.log (JSON.parse(data));

  })
})
request.write(jsonData);
request.end();
});

app.post("/fail", function (req, res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000, function() {
  console.log("server is up");


});
//d502791e7124aab440bb82b0850e6da7-us17
//6d32f788b4
