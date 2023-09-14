// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//--------------------
// Solution starts from here
// when endpoint has a time value

app.get("/api/:date", function(req,res) {
  let inputString=(req.params.date);
// checking inputString whether string or number
  if(isNaN(inputString)){

    let dateString=new Date(inputString);
    // checking whether it is valid string for date or not
    if(dateString.toUTCString()==="Invalid Date") { 
      res.json({
        error: "Invalid Date"
      })
    }
    else {
      res.json({
        unix: dateString.getTime(),
        utc: dateString.toUTCString()
      })
    }  
  } else {
    dateString=new Date(Number(inputString));
    res.json({
      unix: dateString.getTime(),
      utc: dateString.toUTCString()
    })
  }
    
});

// when empty time endpoint

app.get("/api", function (req, res) {
 // console.log(new Date());
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

//-----------------------------

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
