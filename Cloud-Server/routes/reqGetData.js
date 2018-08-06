const express = require('express');
//Requiring express router
const router = express.Router();

const Data = require('../models/model_reqGetData'); //require device model
const Users = require('../models/model_node'); //require user model to validate userID.

router.post('/addData', (req, res) => {
    //checking request body:
    if (!req.body.to || !req.body.from || !req.body.item) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    let data = {
        to: req.body.to,
        from: req.body.from,
        item: req.body.item
    }

    //To add devices:
    Data.addData(data, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: "Your req is succesfully placed"
            });
        }
    });

})




//Method to delete Data
router.post('/getData', (req, res) => {
    //checking request body:
    if (!req.body.to) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Data.getreqGetDataByUserName(req.body.to, (err, reqData) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (reqData.length == 0) {
                res.json({
                    success: false,
                    msg: "data for you not found"
                });
            } else {
                reqData.forEach(function (data) {
                    Data.removeData(data._id, (err) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            });
                        }
                    });
                });
                res.json({
                    success: true,
                    msg: reqData
                });
            }
        }
    });

});


//Exporting the router as a Module
module.exports = router;