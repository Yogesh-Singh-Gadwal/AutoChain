// Getting required packages:
const express = require('express');
const router = express.Router();
const ACCEPT = require('../models/accept_model');
const CONFIRM = require('../models/confirms_model');
const REQ = require('request');
const UNACCEPTED = require('../models/unaccepted_req_model');
const CHAIN = require('../models/chain_model');
const ITEM = require('../models/item_model');

// const server_addr = "http://192.168.43.56:8090"
const server_addr = "https://vishal.eraofiot.in:8000"


// handling post request to get requests from cloud:
router.post('/getrequestsfromcloud', function (req, res) {
    var options = {
        uri: server_addr + "/reqGetData/getData",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    }
    REQ.post(options, (err, Res, body) => {
        //console.log(body);
        var inbound = JSON.parse(body);
        //  console.log(inbound);
        if (err) {
            //console.log(err);
            res.json({
                success: false,
                msg: "Error getting Requests from Cloud"
            });
        }
        else {
            if (inbound.success) {
                UNACCEPTED.addReqs(inbound.msg);
                res.json({
                    success: true,
                    msg: "Requests added in Database"
                })
            }
        }
    })
});


// handling post requesst to get requests from local database
router.get('/getrequestsfromlocal', (req, res) => {
    UNACCEPTED.getAllReqs((err, resReqs) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: resReqs
            });
        }
    });
});


// handling get requests to get acccepted requests from local database
router.get('/getacceptedrequestsfromlocal', (req, res) => {
    ACCEPT.getAllReqs((err, resItems) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: resItems
            });
        }
    });
});


// handling post request to get confirmations from cloud
router.post('/getconfirmationsfromcloud', (req, res) => {
    var options = {
        uri: server_addr + "/confirmation/getConf",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    }
    REQ.post(options, (err, Res, body) => {
        var inbound = JSON.parse(body);
        // console.log(inbound);

        if (err) {
            res.json({
                success: false,
                msg: err
            });
        }
        else {
            CONFIRM.addReqs(inbound.msg, (err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Error adding confirmation to Database"
                    });
                } else {
                    res.json({
                        success: true,
                        msg: "Confirmations successfully downloaded"
                    });
                }
            });
        }
    });
});


// handling get request to get confirmations from local
router.get('/getconfirmationsfromlocal', (req, res) => {
    CONFIRM.getAllReqs((err, resReqs) => {
        if (err) {
            res.json({
                success: false,
                msg: "Error finding confirmations"
            });
        } else {
            res.json({
                success: true,
                msg: resReqs
            });
        }
    });
});


// handling post request to accept requests
router.post('/onaccept', (req, res) => {
    console.log(req.body);
    var options = {
        uri: server_addr + "/confirmation/sendConf",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    }
    REQ.post(options, (err, Res, body) => {
        var inbound = JSON.parse(body)
        console.log(inbound);
        if (err) {
            console.log("Error sending confirmation.");
        }
        if (inbound.success) {
            console.log("Confirmation successfully sent.");
        }

        ACCEPT.addReqs(req.body, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error adding Request to Database"
                });
            }
        });
        UNACCEPTED.removeReqs(req.body, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error removing Request from Unaccepted Database"
                });
            } else {
                res.json({
                    success: true,
                    msg: "Requests successfully added in confirmation Database and Confirmation is sent"
                })
            }
        });
    });
});

// handing post request to reject requests:
router.post('/onreject', (req, res) => {
    UNACCEPTED.removeReqs(req.body, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: "Error removing Request from Unaccepted Database"
            });
        }
        else {
            res.json({
                success: true,
                msg: "Successfully removed from Database"
            })
        }
    });
});


// handling post requests to make requests
router.post('/makeReqs', (req, res) => {
    if (!req.body.to || !req.body.from || !req.body.item) {
        res.json({
            success: false,
            msg: "Insufficient Data"
        });
    } else {
        var options = {
            uri: server_addr + "/reqGetData/addData",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        }
        REQ.post(options, (err, RES, body) => {
            var inbound = JSON.parse(body);
            if (err) {
                res.json({
                    success: false,
                    msg: "Error making request"
                });
            } else {
                if (inbound.success)
                    res.json({
                        success: true,
                        msg: "Request Successfully made, Wait for confirmation."
                    });
                else
                    res.json({
                        success: false,
                        msg: "Error making request"
                    });
            }
        })
    }
});


// handling post request to get UUID:
router.post('/getuuid', (req, res) => {
    if (!req.body.productName || !req.body.type || !req.body.zone) {
        res.json({
            success: false,
            msg: "Insufficient Data"
        });
    } else {
        var options = {
            uri: server_addr + "/conversion/getUuid",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        }

        REQ.post(options, (err, Res, body) => {
            var inbound = JSON.parse(body)
            // console.log(inbound.uuid);

            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Error getting UUID"
                });
            } else {
                res.json({
                    success: true,
                    msg: inbound.uuid
                });
            }
        });
    }
});

router.forMqtt = function (topic, message) {
    console.log("message recieved on topic: " + topic);
    
    if (topic == "update/finallySold") {
        console.log("MQTT: ");
        console.log(message.toString());
        
        var inbound = JSON.parse(JSON.parse(message))

        console.log(inbound);
        

        ITEM.findItemByUUID(inbound, (err, resItem) => {
            if (err) {
                    console.log("Error addding Finally sold");
            }
            else {
                // if (resItem) {
                    console.log(resItem);
                    ITEM.updateFinallySold(resItem._id, (err) => {
                        if (err) {
                            console.log("Error updating finallySold");
                            console.log(err);
                        } else {
                            console.log("FinallySold updated successfully");
                        }
                    });
                }
            // }
        });
    } else if (topic == "txn/addBlock") {
        console.log("WS: ");
        var inbound = JSON.parse(message);
        console.log(inbound);
        

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
    }
}

router.post('/finduuid', (req, res) => {
    var payload = {
        uuid: req.body.uuid
    }

    if (!req.body.uuid) {
        res.json({
            success: false,
            msg: "Insufficient data"
        });
    } else {
        var options = {
            uri: server_addr + "/txn/trackUuid",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        REQ.post(options, (err, Res, body) => {
            var inbound = JSON.parse(body);
            // console.log(JSON.stringify(body));

            console.log(inbound);

            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            }
            else {
                // console.log(inbound);
                res.json({
                    success: true,
                    msg: inbound
                });
            }

        });
    }
});

module.exports = router;
