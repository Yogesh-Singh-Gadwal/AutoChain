// Getting required packages:
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var ITEM = require('./models/item_model');
var WebSocket = require('ws');
//var webSocket = require('./WS')
var bodyParser = require('body-parser');
var CHAIN = require('./models/chain_model');
var TXN = require('./routes/txns')


//------------Mongoose Configuration---------------
mongoose.connect("mongodb://localhost:27017/myNodeData", { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log("Connected to Database");
});

mongoose.connection.on('error', () => {
  console.log("Error connecting Database");
});
//---------------------------------------------------


var indexRouter = require('./routes/index');
var nodeRouter = require('./routes//node');
var txnsRouter = require('./routes/txns');
var itemRouter = require('./routes/item-data');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())



//app.use('/', indexRouter);
app.use('/node', nodeRouter);
app.use('/txn', txnsRouter);
app.use('/item', itemRouter)

//------------Connecting to P2P server------------
var ws = new WebSocket("ws://vishal.eraofiot.in:6090");
// var ws = new WebSocket("ws://192.168.0.106:6009");

ws.on('open', function open() {
  console.log("Connected to P2P server");
});

ws.on('message', function incoming(data) {
  var inbound = JSON.parse(data);
  console.log("WS");
  console.log(inbound);
   //var inbound = JSON.parse(input)

  var tosave = {
    previousHash: inbound.previousHash,
    timestamp: inbound.timestamp,
    to: inbound.to,
    from: inbound.from,
    productName: inbound.productName,
    hash: inbound.hash
  }

  CHAIN.addBlock(tosave, (err) => {
    if (err) {
      console.log("Error adding block into chain");
    } else {
      console.log("Block successfully added into chain");
    }
  })
});

ws.on('close', function close() {
  console.log('P2P disconnected');
});
//------------------------------------------------


//--------------MQTT configuration-------------------
var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://ashu.eraofiot.in:1883");

client.on('connect', () => {
  console.log("MQTT Connected");
  client.subscribe("#");
});

client.on('message', (topic, message) => {
  TXN.forMqtt(topic,message);
});

client.on('close', () => {
  console.log("MQTT Disconnected");
});

//----------------------------------------------------------



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
