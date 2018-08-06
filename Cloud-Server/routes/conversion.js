const express = require('express');
//Requiring express router
const router = express.Router();
//requiring models
const Type = require('../models/model_type');
const Zone = require('../models/model_zone');
const Name = require('../models/model_name');
const NODE = require('../models/model_node')

var rn = require('random-number');

var gen8 = rn.generator({
    min: 10000000,
    max: 99999999,
    integer: true
})
var gen12 = rn.generator({
    min: 100000000000,
    max: 999999999999,
    integer: true
})





router.post('/getUuid', (req, res) => {
    //checking request body:
    if (!req.body.productName || !req.body.zone || !req.body.type) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {

        Name.getNameByName(req.body.productName, (err, reqName) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (!reqName) {
                    res.json({

                        success: false,
                        uuid: "product name not found"
                    })

                }
                else {
                    Zone.getZoneByName(req.body.zone, (err, reqZone) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            })
                        } else {
                            if (!reqZone) {
                                res.json({

                                    success: false,
                                    uuid: "zone not found"
                                })

                            }
                            else {
                                Type.getTypeByType(req.body.type, (err, reqType) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err
                                        })
                                    } else {

                                        if (!reqType) {
                                            res.json({

                                                success: true,
                                                uuid: "type not found"
                                            })

                                        }
                                        else {

                                            var uuid = gen8() + "-" + reqName.number + "-" + reqType.number + "-" + reqZone.number + "-" + gen12()
                                            res.json({

                                                success: true,
                                                uuid: uuid
                                            })
                                        }


                                    }

                                })

                            }




                        }
                    })

                }

            }


        })
    }
})



router.post('/getItem', (req, res) => {
    //checking request body:
    if (!req.body.uuid) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {

        var uuidArray = req.body.uuid.split("-")

        Name.getNameByNumber(uuidArray[1], (err, reqName) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (!reqName) {

                    res.json({
                        success: false,
                        msg: "product name not found"
                    })
                }
                else {
                    Zone.getZoneByNumber(uuidArray[3], (err, reqZone) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            })
                        } else {
                            if (!reqZone) {

                                res.json({
                                    success: false,
                                    msg: "zone not found"
                                })
                            }
                            else {

                                Type.getTypeByNumber(uuidArray[2], (err, reqType) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err
                                        })
                                    } else {
                                        if (!reqType) {

                                            res.json({
                                                success: false,
                                                msg: "type  not found"
                                            })
                                        }
                                        else {
                                            item = {
                                                productName: reqName.productName,
                                                zone: reqZone.zone,
                                                type: reqType.type,
                                                pid: uuidArray[4]

                                            }

                                            res.json({

                                                success: true,
                                                msg: item
                                            })
                                        }

                                        console.log(uuidArray[4])
                                    }



                                })




                            }
                        }
                    })
                }

            }



        })
    }
})

// router.post('/isretailer', (req, res) => {
//     if (!req.body.username) {
//         res.json({
//             success: false,
//             msg: "Insufficient data"
//         });
//     } else {
//         NODE.getNodeByUserName(req.body.username, (err, resNode) => {
//             if (err) {
//                 res.json({
//                     success: false,
//                     msg: "Error getting items from Database"
//                 });
//             } else {
//                 if (resNode.retailer == "yes")
//                     res.json({
//                         success: true,
//                         retailer: true
//                     });
//                 else if (resNode.retailer == "no")
//                     res.json({
//                         success: true,
//                         retailer: false
//                     });
//             }
//         });
//     }


// });



module.exports = router;