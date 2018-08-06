const express = require('express');
const router = express.Router();
const REQ = require('request');
const ITEM = require('../models/item_model');
const config = require('../user-config');
const CONFIRM = require('../models/confirms_model')

const server_Addr = "http://192.168.0.104:8090"
var resUUID = [];

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

router.post('/additem', (req, res) => {
    if (!req.body.items) {
        res.json({
            success: false,
            msg: "Insufficient Data"
        })
    } else {
        ITEM.getAllItems((err, resItem) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error getting itms from database"
                });
            } else {
                resItem.forEach(item => {
                    resUUID.push(item.uuid);
                    //  console.log(item);
                });


                resUUID.forEach(item => {

                    //console.log(resUUID);
                    if (!(item in req.body.items)) {
                        //[CONVERT TO JSON AND UPDATE SOLD]
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
                            console.log("---->>>>" + inbound);
                            if (err) {
                                console.log("Error Getting convertion of UUID to JSON");
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            } else {
                                ITEM.getItemByPid(inbound.pid, (err, resItem) => {
                                    if (err) {
                                        console.log("Error finding item in database");
                                        res.json({
                                            success: false,
                                            msg: err
                                        });
                                    } else {
                                        if (!resItem) {
                                            console.log("No item found with PID: " + inbound.pid);

                                        } else {
                                            //Check for retailer or not and post a request to publish finally sold
                                            ITEM.updateSold(inbound.pid);
                                            var options = {
                                                uri: server_Addr + "/checkForRet/retDetail",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({ username: config.username })
                                            }
                                            // Request for publishing UUID
                                            REQ.post(options, (err, Res, body) => {
                                                var inbound = JSON.parse(body);
                                                if (err) {
                                                    console.log("Error Getting Retailer details");
                                                    res.json({
                                                        success: false,
                                                        msg: err
                                                    });
                                                } else {
                                                    if (inbound.retailer) {
                                                        var opt = {
                                                            uri: server_Addr + "/publish/soldItem",
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            },
                                                            body: JSON.stringify({ uuid: item })
                                                        }
                                                        REQ.post(opt, (err, Res, body) => {
                                                            var inbound = JSON.parse(body);
                                                            if (err) {
                                                                console.log("Error Publishing UUID");
                                                                res.json({
                                                                    success: false,
                                                                    msg: err
                                                                });
                                                            } else {
                                                                if (inbound.success)
                                                                    console.log("published: " + item);
                                                            }
                                                        });
                                                    }
                                                }
                                            })
                                        }

                                    }
                                })
                            }
                        })
                    }
                });

                req.body.items.forEach(item => {
                    // resUUID.find(value, index, array, () => {
                    // if (value != item) {
                    if (!(item in resUUID)) {

                        //[CONVERT TO JSON AND ADD TO DATABASE]
                        var option = {
                            uri: server_Addr + "/conversion/getItem",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ uuid: item })
                        }

                        REQ.post(option, (err, Res, body) => {
                            //console.log("HERE");

                            var inbound = JSON.parse(body)
                            // console.log(inbound);

                            if (err) {
                                console.log("Error Getting convertion of UUID to JSON");
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            } else {
                                if (!inbound.success) {
                                    res.json({
                                        success: false,
                                        msg: inbound.msg
                                    });
                                } else {
                                    //       console.log(inbound.msg);
                                    ITEM.getItemByPid(inbound.msg.pid, (err, resItem) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err
                                            });
                                        } else {
                                            if (!resItem) {
                                            //     res.json({
                                            //         success: false,
                                            //         msg: "product already in database"
                                            //     });
                                            // } else {

                                                var tosave = {
                                                    name: inbound.msg.productName,
                                                    PID: inbound.msg.pid,
                                                    type: inbound.msg.type,
                                                    uuid: item
                                                }
                                                //     console.log(tosave);

                                                ITEM.addItem(tosave, (err) => {
                                                    if (err) {
                                                        console.log("Error Adding item to database");
                                                        res.json({
                                                            success: false,
                                                            msg: err
                                                        });
                                                    } else {
                                                        console.log("data successfully added in Database");
                                                        //Compare uuid with confirmations and post request for makeBlock + delete request from confirmations
                                                        CONFIRM.getAllReqs((err, resReqs) => {
                                                            if (err) {
                                                                console.log("Error Getting confirmations from Database");
                                                                res.json({
                                                                    success: false,
                                                                    msg: err
                                                                });
                                                            } else {
                                                                if (inbound.name in resReqs && resReqs.item.qty != 0) {
                                                                    var options = {
                                                                        uri: server_Addr + "/txn/addChain",
                                                                        headers: {
                                                                            "Content-Type": "application/json"
                                                                        },
                                                                        body: JSON.stringify(inbound.msg)
                                                                    }
                                                                    REQ.post(options, (err, Res, body) => {
                                                                        var incoming = JSON.parse(body);
                                                                        if (err) {
                                                                            console.log("Error posting block for adding into chain");
                                                                            res.json({
                                                                                success: false,
                                                                                msg: err
                                                                            });
                                                                        } else {
                                                                            if (!incoming.success) {
                                                                                console.log("Error adding block to chain");
                                                                                res.json({
                                                                                    success: false,
                                                                                    msg: "Error adding block to chain"
                                                                                });
                                                                            } else {
                                                                                console.log("Block added to chain");
                                                                                res.json({
                                                                                    success: true,
                                                                                    msg: "Block added to chain"
                                                                                });
                                                                            }
                                                                        }
                                                                    })
                                                                }else{
                                                                    res.json({
                                                                        success:true,
                                                                        msg:"Data added to Database"
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }

                        });
                    }
                });
            }
        });
    }
});

module.exports = router;