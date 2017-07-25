const express = require('express');
const hbs = require('hbs');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.hbs');
})

app.get('/api/', (req, res) => {
  var userAgent = [];
  var flag = true;
  var userLanguage = req.headers["accept-language"];
  req.headers["user-agent"].split(' ').forEach((value, index) => {
    if(index !== 0 && flag){
      if(value[value.length-1] === ')'){
        flag = false
        userAgent.push(value.slice(0, value.length-1));
      }else if(value[0] === '('){
        userAgent.push(value.slice(1));
      }else{
        userAgent.push(value);
      }
    }
  });
  res.json({ipaddress: req.ip, language: userLanguage, software: userAgent.join(' ')})
});

app.listen(port, () => {
  console.log(`Listening to port : ${port}`);
});