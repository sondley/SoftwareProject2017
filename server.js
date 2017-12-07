var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    //created model loading here
    Product = require('./api/models/productsModel'), //created model loading here
    // CustomerField = require('./api/models/customerFieldModel'), //created model loading here
    Client = require('./api/models/clientModel'),
    Truck = require('./api/models/truckModel'),
    bodyParser = require('body-parser');
var connectMongoOnline = 'mongodb://leyloo:Sondley2318@ds259245.mlab.com:59245/sondley';

var cookieParser = require('cookie-parser');
var session = require('express-session');
var http = require('http');
var request = require('request');
var qs = require('querystring');
var util = require('util');
var QuickBooks = require('node-quickbooks');
var Tokens = require('csrf');
var csrf = new Tokens();

QuickBooks.setOauthVersion('2.0');

// Generic Express config
app.set('port', port);
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('brad'));
app.use(session({ resave: false, saveUninitialized: false, secret: 'smith' }));

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(connectMongoOnline);
//mongoose.connect('mongodb://localhost/Tododb');




// INSERT YOUR CONSUMER_KEY AND CONSUMER_SECRET HERE

var consumerKey = 'Q0haK1pjmVaPoNptTODmaArkqN26cGSAJQF67NqpITZv7wtpdH';
    var consumerSecret = 'yYhzcVSkovgfnyduq1Jp5nEUHtIzovHGpHqKuZ6f';

app.get('/', function (req, res) {
  res.redirect('/start');
});

app.get('/start', function (req, res) {
  res.render('intuit.ejs', { locals: { port: port, appCenter: QuickBooks.APP_CENTER_BASE } });
});

// OAUTH 2 makes use of redirect requests
function generateAntiForgery (session) {
  session.secret = csrf.secretSync();
  return csrf.create(session.secret);
};

app.get('/requestToken', function (req, res) {
  var redirecturl = QuickBooks.AUTHORIZATION_URL +
    '?client_id=' + consumerKey +
    '&redirect_uri=' + encodeURIComponent('http://localhost:' + port + '/callback/') +
    '&scope=com.intuit.quickbooks.accounting' +
    '&response_type=code' +
    '&state=' + generateAntiForgery(req.session);

  res.redirect(redirecturl);
});

app.get('/callback', function (req, res) {
  var auth = (new Buffer(consumerKey + ':' + consumerSecret).toString('base64'));

  var postBody = {
    url: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + auth,
    },
    form: {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'http://localhost:' + port + '/callback/'
    }
  };

  request.post(postBody, function (e, r, data) {
    var accessToken = JSON.parse(r.body);

    // save the access token somewhere on behalf of the logged in user
    var qbo = new QuickBooks(consumerKey,
                             consumerSecret,
                             accessToken.access_token, /* oAuth access token */
                             false, /* no token secret for oAuth 2.0 */
                             req.query.realmId,
                             true, /* use a sandbox account */
                             true, /* turn debugging on */
                             4, /* minor version */
                             '2.0', /* oauth version */
                            accessToken.refresh_token /* refresh token */);

    // qbo.findAccounts(function (_, accounts) {
    //   accounts.QueryResponse.Account.forEach(function (account) {
    //     console.log(account.Name);
    //   });
    // });

    var routes = require('./api/routes/todoListRoutes'); //importing route


    var route2 = require('./api/routes/productsRoutes'); //importing route
    var route3 = require('./api/routes/clientRoutes'); //importing route
    var route4 = require('./api/routes/customerFieldRoutes'); //importing route
    var route5 = require('./api/routes/quickBooksRoutes');
    var route6 = require('./api/routes/truckRoutes');

    routes(app); //register the route

    route2(app);
    route3(app);
    route4(app);
    route6(app);
    route5(app, qbo);
  });

  res.send('<!DOCTYPE html><html lang="en"><head></head><body><script>window.opener.location.reload(); window.close();</script></body></html>');
});



// app.listen(port);
//console.log(app);

