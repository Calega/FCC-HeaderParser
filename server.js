const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function(req,res) {
  
  // Ip : If you are behind a proxy or Nginx, both approaches might fail, but I opted to use this than to install a package
  // Language can be retrieved from the request header
  // User agent can be retrieve from the request header

  res.json ( {
     "ipaddress": req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress,
     "language": req.headers['accept-language'],
     "software": req.headers['user-agent']
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
