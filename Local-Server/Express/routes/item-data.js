const express = require('express');
const router = express.Router();
// const REQ = require('request');
var fs = require('fs')
    , path = require('path')
    , certFile = path.resolve(__dirname, '../ssl/cert.pem')
    , keyFile = path.resolve(__dirname, '../ssl/privkey.pem')
    , caFile = path.resolve(__dirname, '..ssl/fullchainpem')
    , REQ = require('request');
const ITEM = require('../models/item_model');
const config = require('../user-config');
const CONFIRM = require('../models/confirms_model');
const BLOCK = require('../models/chain_model');

// const server_Addr = "http://192.168.43.56:8090";
const server_Addr = "https://vishal.eraofiot.in:8000"


// function to create array of present UUIDs
getResUUID = function (callback) {
    var resUUID = [];
    ITEM.getAllItems((err, resItem) => {
        if (err) {
            callback(err, null);
        } else {
            if (resItem.length != 0) {
                resItem.forEach((item) => {
                    resUUID.push(item.uuid);
                });

                callback(null, resUUID)
            } else {
                callback(null, resUUID)
            }
        }
    });

};


//function to get conversion of UUID to JSON
getJSON = function (item, callback) {
    var payload = {
        uuid: item
    }
    var option = {
        uri: server_Addr + "/conversion/getItem",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    REQ.post(option, (err, Res, body) => {
        var inbound = JSON.parse(body)
        if (err) {
            console.log("Error Getting convertion of UUID to JSON");
            callback(err, null);
        } else
            callback(null, inbound);
        // return JSON.stringify(inbound);
    });
};

//Check is the node retailer
isRetailer = function (username, callback) {

    var payload = {
        username: username
    }
    var options = {
        uri: server_Addr + "/checkForRet/retDetail",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    REQ.post(options, (err, Res, body) => {
        var inbound = JSON.parse(body);
        // console.log(inbound);

        if (err) {
            console.log("Error Getting Retailer details");
            callback(err, null);
        } else {
            if (inbound.retailer)
                callback(null, inbound.retailer);
            else
                callback(null, inbound.retailer);
        }
    });
};


addToChain = function (data, callback) {
    console.log("Add to chain called");

    resName = [];
    CONFIRM.getAllReqs((err, resReqs) => {
        if (err) {
            console.log("Error Getting confirmations from Database");

        } else {
            // console.log("Data:");
            // console.log(data);
            // console.log("resReqs");
            // console.log(resReqs);

            resReqs.forEach(item => {
                if (item.item.productName == data.name && item.item.qty != 0) {
                    if ((item.item.qty - 1) == 0) {
                        CONFIRM.removeReqs(item, (err) => {
                            if (err) {
                                console.log("Error removing item from confirms database");
                            } else {
                                console.log("item removed from database");
                            }
                        });
                    } else {
                        CONFIRM.updateQty(item, (err) => {
                            if (err)
                                console.log("Error updating confirmation list");

                            else
                                console.log("item quantity decremented");

                        });
                    }
                    var payload = {
                        to: item.to,
                        from: item.from,
                        productName: item.item.productName,
                        uuid: data.uuid

                    }
                    var options = {
                        uri: server_Addr + "/txn/addChain",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    }
                    REQ.post(options, (err, Res, body) => {
                        var inbound = JSON.parse(body);
                        console.log("After sending addtoChain");

                        console.log(inbound);

                        if (err) {
                            console.log("Error posting block for adding into chain");
                            callback(err, null)
                        } else {
                            if (!inbound.success) {
                                console.log("Error adding to chain");
                                callback(null, false);
                            } else {
                                console.log("Added to Chain");
                                callback(null, true);
                            }
                        }
                    });
                }
            });
        }
    });
};


//To send a post request to publish FinallySold
publishFinallySold = function (uuid, callback) {
    isRetailer(config.username, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            console.log(res);

            var payload = {
                uuid: uuid
            }
            var option = {
                uri: server_Addr + "/txn/soldItem",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
            REQ.post(option, (err, Res, body) => {
                var inbound = JSON.parse(body);
                if (err) {
                    console.log("Error Publishing UUID");
                    callback(err, null);
                } else {
                    if (inbound.success) {
                        console.log("published: " + uuid);
                        callback(null, true);
                    } else
                        callback(null, false)
                }
            });
        } else {
            callback(null, false);
        }
    });
}

router.get('/getitems', (req, res) => {
    ITEM.getAllItems((err, Items) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: Items
            });
        }
    });
});


router.get('/getchain', (req, res) => {
    BLOCK.getChain((err, resChain) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: resChain
            });
        }
    });
});



router.post('/additem', (req, res) => {
    console.log("INSIDE additem");
    var Save = {};
    if (!req.body.items) {
        res.json({
            success: false,
            msg: "Insufficient Data"
        })
    } else {
        getResUUID((err, res) => {
            if (err) {
                console.log("Error getting UUID list from local Database");

            } else if (res) {
                // console.log("resUUID===>");
                // console.log(res);

                req.body.items.forEach(item => {
                    if (!(res.includes(item))) {
                        console.log("HERE ADD");


                        // var tosave = JSON.parse(getJSON(item));
                        getJSON(item, (err, tosave) => {
                            if (err) {
                                console.log("Error getting JSON for UUID");
                            } else {

                                Save = {
                                    name: tosave.msg.productName,
                                    PID: tosave.msg.pid,
                                    type: tosave.msg.type,
                                    uuid: item
                                }
                                //console.log(Save);
                            }
                            ITEM.addItem(Save, (err, res) => {
                                if (err) {
                                    console.log("Error adding item to database");
                                    console.log(err);
                                } else if (res) {
                                    addToChain(Save, (err, res) => {
                                        if (err)
                                            console.log("Error adding item");
                                        else {
                                            if (!res) {
                                                console.log("Error adding item to Database");
                                            } else {
                                                console.log("Item added to Database and chain");
                                            }
                                        }
                                    })//, 1000 * 2);
                                }
                            })
                        });
                    }
                });

                res.forEach(item => {
                    if (!(req.body.items.includes(item))) {
                        console.log(("HERE UPDATE"));

                        getJSON(item, (err, res) => {
                            if (err) {
                                console.log("Error adding item");
                            } else {
                                ITEM.getItemByPid(res.msg.pid, (err, resItem) => {
                                    if (err) {
                                        console.log("Error getting item by PID");
                                    } else {
                                        if (!resItem.finallySold) {
                                            ITEM.updateSoldItem(resItem._id, (err) => {
                                                if (err) {
                                                    console.log("Error updating sold");
                                                } else {
                                                    publishFinallySold(item, (err, res) => {
                                                        if (err) {
                                                            console.log("Error in publishing finallySold");
                                                        } else if (res) {
                                                            console.log(res);
                                                            console.log("Finally sold published!");
                                                        } else
                                                            console.log("Finally sold not published!");
                                                    })
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });
        res.json({
            success: true,
            msg: "data operations completed"
        });
    }
});

module.exports = router;