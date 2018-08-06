const express = require('express');
//Requiring express router
const router = express.Router();
//requiring model for Node
const Node = require('../models/model_node');
const Data = require('../models/model_reqGetData');


router.get('/getAllNode',(req,res)=>{
Node.getAllNode((err,resNode)=>{
    if(err){
        res.json({
            suceess:false
        })
    }
    else{
        res.json({
            success:true,
            msg:resNode
        })
    }
})


})

//Post request function: 
router.post('/addNode', (req, res) => {
    //checking request body:
    if (!req.body.shopname || !req.body.username || !req.body.password || !req.body.retailer) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        //function for searching the username for given username in the database, so that no two users can have same username
        Node.getNodeByUserName(req.body.username, (err, reqNode) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (reqNode) {
                    res.json({
                        success: false,
                        msg: "username already exists."
                    })
                } else {

                    let node = {
                        name: req.body.shopname,
                        username: req.body.username,
                        password: req.body.password,
                        retailer: req.body.retailer,

                    }
                    //function to add user to the database:
                    Node.addNode(node, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: "Node successfully added"
                            });
                    });
                }
            }
        });
    }
});



//Method to make the user login:
router.post('/login', (req, res) => {
    //checking request body:
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        Node.getNodeByUserName(req.body.username, (err, reqNode) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (!reqNode) {
                    res.json({
                        success: false,
                        msg: "username doesn't exists."
                    });
                } else {
                    if (user.password != reqNode.password) {
                        res.json({
                            success: false,
                            msg: "Wrong Password"
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: {
                                username: reqNode.username,
                                name: reqNode.name,
                                id: reqNode._id,
                                retailer:reqNode.retailer
                            }
                        });
                    }
                }

            }

        });
    }

});


//Method to Update Password:
router.post('/updatePasswd', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.newPasswd) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        Node.getNodeByUserName(req.body.username, (err, reqNode) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (!reqNode) {
                    res.json({
                        success: false,
                        msg: "username doesn't exists."
                    });
                } else {
                    if (user.password != reqNode.password) {
                        res.json({
                            success: false,
                            msg: "Wrong Password"
                        });
                    } else {
                        reqNode.password = req.body.newPasswd;
                        Node.UpdatePassword(reqNode, (err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            } else {
                                res.json({
                                    success: true,
                                    msg: "Password Successfully Updated.!"
                                });
                            }

                        })

                    }
                }
            }

        });
    }
});


//Method to delete user:
router.post('/remove', (req, res) => {
    //checking request body:
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    } else {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        Node.getNodeByUserName(req.body.username, (err, reqNode) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (!reqNode) {
                    res.json({
                        success: false,
                        msg: "username doesn't exists."
                    });
                } else {
                    if (user.password != reqNode.password) {
                        res.json({
                            success: false,
                            msg: "Wrong Password"
                        });
                    } else {

                        Node.removeNode(reqNode._id, (err) => {

                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            } else {

                                Data.removeData(reqNode._ids, (err) => {



                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err
                                        });
                                    } else {

                                        res.json({
                                            success: true,
                                            msg: "User Deleted Successfully..!"
                                        });

                                    }
                                });
                            }




                        })


                    }
                }

            }

        });
    }

});

//Exporting the router as a Module
module.exports = router;