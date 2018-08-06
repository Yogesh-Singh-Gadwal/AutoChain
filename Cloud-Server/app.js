//Requiring the express middleware
const express = require('express'),
    https = require('https'),
    fs = require('fs');

//Creating an instance of express
const app = express();
var request = require('request');
//Requiring  modules
const path = require('path');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//requiring cors for Cross Oriented Resource Sharing, so that same services on different ports can be used. 
const cors = require('cors');
app.use(cors());

//requiring websockets

//const WS = require('./WebSocket/webSocket');
const WS = require('./WebSocket/webSocket');

const BC = require('./Blockchain/blockchain')

//REquiring credential files:
const cred = require('./config/credentials');

//-------------------MongoDB Operations---------------------

mongoose.connect(cred.database);

mongoose.connection.on('connected', () => {
    console.log("Connected to Database");

})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting Database");

})

//use of environment defined port if available otherwise 8080
const PORT = process.env.port || 8090;
var HOST = process.env.HOST || '';

//express static folder path
app.use(express.static(path.join(__dirname, "public")));
//using body parser for parsing json file from request
app.use(bodyparser.json());
app.use(morgan('dev'));

//requiring routes as resources
const node = require('./routes/node');
const reqGetData = require('./routes/reqGetData');
const txn = require('./routes/txn');
const confirmation = require('./routes/confirmation')
const publish = require('./routes/publish')
const addNameZoneType = require('./routes/addNameZoneType')
const conversion = require('./routes/conversion')
const checkForRet = require('./routes/checkForRet')
const txn1 = require('./routes/txn1');
const Bl = require('./routes/blockchain');



//using routes for resources
app.use('/node', node);
app.use('/reqGetData', reqGetData);
app.use('/txn', txn);
app.use('/confirmation', confirmation)
app.use('/publish', publish)
app.use('/addNameZoneType', addNameZoneType)
app.use('/conversion', conversion)
app.use('/checkForRet', checkForRet)
app.use('/txn1', txn1);




//Routing all request to the static file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//start listening to the request
var options = {
    key: fs.readFileSync('ssl/privkey.pem'),
    ca: fs.readFileSync('ssl/fullchain.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
}

https.createServer(options, app).listen(PORT, HOST, null, () => {
    console.log('Server listening on port %d in %s mode', this.address().port, app.settings.env);
});

WS.initP2PServer();
Bl.genBlock((err, res) => {
    if (err) {
        console.log("Error generating Genesis block");

    } else {
        console.log("Genesis block added successfully");

    }
});
