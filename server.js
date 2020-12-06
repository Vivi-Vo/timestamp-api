// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

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

app.get("/api/timestamp", (req, res) => {
  let currentTime = Date.now();
  let utcTime = new Date().toUTCString();
  res.json({unix : currentTime, utc: utcTime});
})


app.get("/api/timestamp/:date", (req, res) => {
  const dateParam = req.params.date;
  let date = new Date(dateParam);

  if (isNaN(date.valueOf()))
    date = new Date(parseInt(dateParam));
 
  if (date.toUTCString() === 'Invalid Date'){
    res.json({error: "Invalid Date"});
  }
  else{
    let unixTime = date.valueOf();
    let utcTime = date.toUTCString();
    res.json({unix : unixTime, utc: utcTime});
  }
})


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
