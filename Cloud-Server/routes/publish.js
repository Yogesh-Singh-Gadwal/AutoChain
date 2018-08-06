const express = require('express');
const router = express.Router();
var mqtt = require('mqtt')
router.post('/soldItem', (req, res) => {
   
    var solditem=JSON.stringify(req.body.uuid)
    console.log(solditem)
    var client  = mqtt.connect('mqtt://ashu.eraofiot.in')

    client.on('connect', function () {
        
        client.publish('update/finallySold', solditem)
      })
      res.json({
        success: true,
        msg: "publish successfully"
    });


});
//Exporting the router as a Module
module.exports = router;