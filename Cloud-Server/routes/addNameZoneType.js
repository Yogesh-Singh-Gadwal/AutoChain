const express = require('express');
const fs=require('fs');
//Requiring express router
const router = express.Router();
//requiring models
const Type = require('../models/model_type');
const Zone = require('../models/model_zone');
const Name = require('../models/model_name');



router.post('/addProductName', (req, res) => {
    //checking request body:
    if (!req.body.productName) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }  else {
        let varObj = fs.readFileSync('var.json');
        let variable = JSON.parse(varObj);
        var inc1 = variable.inc1

       

        Name.getNameByName(req.body.productName, (err, reqName) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (reqName) {
                    res.json({
                        success: false,
                        msg: "product already exists."
                    })
                } else {
                    
                    name = {

                        productName: req.body.productName,
                        number: inc1
                    }

                    Name.addName(name, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: "Product name successfully added with number :"+inc1
                            });
                        
                    });

                    var newVar={
                        inc1:variable.inc1+1,
                        inc2:variable.inc2,
                        inc3:variable.inc3
                    }
                    let data = JSON.stringify(newVar);  
                    fs.writeFileSync('var.json', data);


                }
            }
        })
    }
})


router.post('/addZone', (req, res) => {
    //checking request body:
    if (!req.body.zone) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {

        let varObj = fs.readFileSync('var.json');
        let variable = JSON.parse(varObj);
        var inc2 = variable.inc2


        Zone.getZoneByName(req.body.zone, (err, reqZone) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (reqZone) {
                    res.json({
                        success: false,
                        msg: "product already exists."
                    })
                } else {
                    
                    zone = {

                        zone: req.body.zone,
                        number: inc2
                    }

                    Zone.addZone(zone, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: " Zone successfully added with number :"+inc2
                            });
                            var newVar={

                                inc1:variable.inc1,
                                inc2:variable.inc2+1,
                                inc3:variable.inc3
                            }
                            let data = JSON.stringify(newVar);  
                            fs.writeFileSync('var.json', data);

                    });

                }
            }
        })
    }
})

router.post('/addType', (req, res) => {
    //checking request body:
    if (!req.body.type) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        let varObj = fs.readFileSync('var.json');
        let variable = JSON.parse(varObj);
        var inc3 = variable.inc3
        Type.getTypeByType(req.body.type, (err, reqType) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            } else {
                if (reqType) {
                    res.json({
                        success: false,
                        msg: "product already exists."
                    })
                } else {
                    
                    type = {

                        type: req.body.type,
                        number:inc3
                    }

                    Type.addType(type, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: " Type successfully added with number :"+inc3
                            });
                            var newVar={

                                inc1:variable.inc1,
                                inc2:variable.inc2,
                                inc3:variable.inc3+1
                            }
                            let data = JSON.stringify(newVar);  
                            fs.writeFileSync('var.json', data);
                    });

                }
            }
        })
    }
})


module.exports = router;