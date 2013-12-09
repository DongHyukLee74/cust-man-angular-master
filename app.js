/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes/index'),
    http = require('http'),
    cust = require('./routes/custman');
var app = express();

// Configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false,
    pretty: true,
  });
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/custman', cust.findAll);
app.get('/api/custman/:id', cust.findById);
app.post('/api/custman', cust.addCust);
app.post('/api/custman/:id', cust.updateCust);
app.delete('/api/custman/:id', cust.deleteCust);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
