const express = require('express');
//Requiring express router
const router = express.Router();
//requiring model for Node
const Node = require('../models/model_node');



router.post('/retDetail', (req, res) => {
    console.log(req.body.username)

    if (!req.body.username) {
        if (req.body.username == "") {
            res.json({
                success: false,
                msg: "not login properly"
            });
        }
        else {
            res.json({
                success: false,
                msg: 'Insufficient Data'
            });
        }

    } else {

        //    else if (req.body.username == null) {
        //         res.json({
        //             success: false,
        //             msg: "not login properly"
        //         });
        //     }
        Node.getNodeByUserName(req.body.username, (err, reqNode) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "error to get username"
                })
            }
            else {
                if (!reqNode) {
                    res.json({
                        success: false,
                        msg: "username does not exists."
                    })
                }
                else {

                    if (reqNode.retailer == "yes") {
                        res.json({
                            success: true,
                            retailer: true
                        })
                    }
                    else {
                        res.json({
                            success: true,
                            retailer: false

                        })
                    }
                }
            }

        })



    }

});
module.exports = router