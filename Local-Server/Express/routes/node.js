const express = require('express');
// Requiring express router
const router = express.Router();
var request =require("request");
var config = require('../user-config')

// make changes everywhere where uri is present as per requirement
// const server_Addr = "http://192.168.43.56:8090" 
const server_Addr = "https://vishal.eraofiot.in:8000"


// Get request for getting all the users
router.get("/getallnodes", (req, res) => {

  var options={
    uri:server_Addr+"/node/getAllNode",
    headers:{
      "Content-Type":"application/json"
    }

  };

  request.get(options,(err,Res,body)=>{

    if(err)
        console.log(err);

    var inbound=JSON.stringify(body);
    console.log(inbound);
    res.json({
      success:true,
      msg:inbound
    })
})
});


// POST for adding a user signup/login change in options url as required
router.post('/register', (req, res) => {

  var options={
    uri:server_Addr+"/node/addNode",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(req.body) 
  };
  request.post(options, (err,Res,body)=>{
    console.log(body);
    var inbound = JSON.parse(body);
    console.log(inbound);
    if(err)
    console.log(err);
    if (inbound.success){
      console.log("user added");
      res.json({
        success:true,
        msg:"Account successfully created"
      });
    }
      else{
      console.log(inbound.msg);
      res.json({
        success:false,
        msg:"Error creating account"
      });
    }
  })
});


// POST for login change in options url as required
router.post('/login', (req, res) => {

  var options={
    uri:server_Addr+"/node/login",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(req.body)
  };

  request.post(options, (err,Res,body)=>{
    
    var inbound = JSON.parse(body);
    if(err)
    console.log(err);
    if (inbound.success){
      console.log("user logged successfully");
      config.username = req.body.username;
      console.log(JSON.parse(body).msg);
      res.json({
        success:true,
        msg:JSON.parse(body).msg
      });
      }
      else{
       console.log(inbound.msg);  
      res.json({
        success:false,
        msg: inbound.msg
      });
    }
  })
});


//POST for updating password
router.post('/updatepasswd', (req, res) => {

  var options={
    uri:server_Addr+"/node/updatePasswd",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(req.body)
  };
  
  request.post(options,(err,Res,body)=>{
    var inbound = JSON.parse(body);
    if(err)
    console.log(err);
    if (inbound.success){
      console.log("Password Updated");
      res.json({
        success:true,
        msg:"password succcessfully updated"
      });
      }
      else{
       console.log(inbound.msg);
       res.json({
        success:false,
        msg:"Error updating password "
      });
      }
    })
});


// POST for delete
router.post('/delete', (req, res) => {

  var options={
    uri:server_Addr+"/node/remove",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(req.body)
  };

  request.post(options,(err,Res,body)=>{
    var inbound = JSON.parse(body);
    if(err)
    console.log(err);
    if (inbound.success){
      console.log("User deleted");
      res.json({
        success:true,
        msg:"Account succcessfully deleted"
      });
      }
      else{
      console.log(inbound.msg);
      res.json({
        success:false,
        msg:"Error deleting account "
      });
      }
    })
});

module.exports = router