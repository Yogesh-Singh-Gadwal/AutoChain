const express = require('express');

const router = express.Router();

const WS = require('../WebSocket/webSocket');
const BC = require('../routes/blockchain')
const Bl = require('../models/model_blockchain')

router.get('/peers', (req, res) => {

    res.json({
        succeess: true,
        msg: WS.socket.map(s => s._socket.remoteAddress + ":" + s._socket.remotePort)

    })
});



router.get('/blocks', (req, res) => {
    Bl.getChain((err, reqChain) => {
        if (err) {
            res.json({
                succeess: false,
                msg: "error getting to get data from blockchain"
            })

        } else {
            res.json({
                succeess: true,
                msg: reqChain
            })
        }
    })
});

router.post('/addChain', (req, res) => {


    if (!req.body.to || !req.body.from || !req.body.productName) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    else {
        block = {
            to: req.body.to,
            from: req.body.from,
            productName: req.body.productName

        }

        //console.log(req.body.data);

        BC.generateNextBlock(block, (err, newBlock) => {
            console.log("Generated block: ");
            console.log(newBlock)
            BC.addBlock(newBlock, (err, Res) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Error addding block into chain"
                    });
                } else {
                    if (Res) {
                        WS.brodcast(newBlock);
                        console.log('block added:' + JSON.stringify(newBlock));
                        res.json({
                            success: true,
                            msg: " txn successfull"
                        });
                    } else {
                        res.json({
                            success: false,
                            msg: " txn failed"
                        });
                    }
                }
            });
        });
    }
});




module.exports = router;