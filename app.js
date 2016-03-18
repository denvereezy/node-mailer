const express      = require('express'),
      exhbs        = require('express-handlebars'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      compression  = require('compression'),
      nodemailer   = require('nodemailer'),
      routes       = require('./routes/index'),
      app          = express();


app.use(cookieParser('shhhh, very secret'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(compression());
app.engine('handlebars', exhbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res){
  res.render('index');
});
app.post('/contact',routes.sendEmail);

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
