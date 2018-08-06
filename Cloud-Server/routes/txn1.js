const express = require('express');

const router = express.Router();

const WS = require('../WebSocket/webSocket');
const BC = require('../Blockchain/blockchain')

router.get('/peers', (req, res) => {

    res.json({
        succeess: true,
        msg: WS.socket.map(s => s._socket.remoteAddress + ":" + s._socket.remotePort)

    })
});



router.get('/blocks', (req, res) => {
    res.json({
        succeess: true,
        msg: BC.blockchain
    })
});

router.post('/addChain', (req, res) => {


    if (!req.body.data) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    else {

        //console.log(req.body.data);
        var newBlock = BC.generateNextBlock(req.body.data);
        BC.addBlock(newBlock);
        WS.brodcast(BC.responseLatestMsg());
        console.log('block added:' + JSON.stringify(newBlock));
        res.json({
            success: true,
            msg: " txn successfull"
        })
    }
});




module.exports = router;