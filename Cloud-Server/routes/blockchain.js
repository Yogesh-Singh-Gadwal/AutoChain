
// //var CryptoJs = require('crypto-js')
// var SHA256 = require("crypto-js/sha256");
// //var express = require('express')
// //var bodyparser = require('body-parser')
// //var WebSocket = require('ws')
// const Bl = require('../models/model_blockchain')


// //define a block structure as per block chain
// class Block {

//     constructor(index, previousHash, timestamp, to, from, productName, hash) {
//         this.index = index;
//         this.previousHash = previousHash;
//         this.timestamp = timestamp;
//         this.to = to;
//         this.from = from;
//         this.productName = productName;
//         this.hash = hash.toString();
//     }
// }




// var getGenesisBlock = (callback) => {

//     callback(new Block(0, "0", 14556783, "owner", "consumer", "anything", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"));
// }
// module.exports.genBlock = (callback) => {

//     Bl.getChain((err, reqChain) => {
//         if (err) {

//             callback(err, null);
//         }
//         else {
//             if (reqChain.length == 0) {

//                 getGenesisBlock((res) => {

//                     Bl.addBlockToChain(res, (err) => {
//                         if (err) {
//                             // console.log("err to add genesis block")
//                             callback(err, null);
//                         } else {

//                             // console.log("Your genesis block is succesfully added");
//                             callback(null, true);
//                         }
//                     });
//                 })

//             }
//         }

//     })
// }




// module.exports.generateNextBlock = (blockData, callback) => {

//     Bl.getLatestChain((err, reqChain) => {
//         if (err) {
//             console.log("error to get latest block");
//             callback(err, null);
//         }
//         else {
//             var preBlock = (reqChain[0])
//             var nextIndex = preBlock.index + 1;
//             var nextTimeStamp = new Date().getTime();
//             var Hash = SHA256(index + previousHash + timestamp + to + from + productName).toString();
//             var generatedBlock = new Block(nextIndex, preBlock.hash, nextTimeStamp, blockData.to, blockData.from, blockData.productName, Hash);
//             callback(null, generatedBlock)
//         }
//     })
// }


// //calculate hash for blocks

// var calculateHashForBlock = (block, callback) => {

//     callback(calculateHash(block.index, block.previousHash, block.timestamp, block.to, block.from, block.productName));
// }



// //add a block into blockchain
// module.exports.addBlock = (newBlock, callback) => {

//     Bl.getLatestChain((err, reqChain) => {
//         if (err) {
//             callback(err, null);
//         }
//         else {
//             var latest = (reqChain[0]);

//             isValidNewBlock(newBlock, latest, (res) => {
//                 if (res) {
//                     Bl.addBlockToChain(newBlock, (err) => {
//                         if (err) {
//                             console.log("Error in adding block to chain");
//                             callback(err, null);
//                         } else {
//                             console.log("Block successfully added to chain");

//                             callback(null, true);
//                         }
//                     });

//                 } else {
//                     callback(null, false);
//                 }
//             });
//         }
//     })
// }

// var isValidNewBlock = (newBlock, previousBlock, callback) => {

//     if (previousBlock.index + 1 != newBlock.index) {
//         console.log("invalid index");
//         callback(false);
//     }
//     else if (previousBlock.hash != newBlock.previousHash) {
//         console.log("invalid previoushash")
//         callback(false);
//     }
//     else {
//         calculateHashForBlock(newBlock, (res) => {
//             if (res != newBlock.hash)
//                 callback(false)
//             else
//                 callback(true);
//         });
//     }
// };


// module.exports.responseLatestMsg = () => ({
//     'data': getLatestBlock()
// });
//  //=========================================



//var CryptoJs = require('crypto-js')
var SHA256 = require("crypto-js/sha256");
//var express = require('express')
//var bodyparser = require('body-parser')
//var WebSocket = require('ws')
const Bl = require('../models/model_blockchain')


//define a block structure as per block chain
class Block {

    constructor(index, previousHash, timestamp, to, from, productName, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.to = from;
        this.from = to;
        this.productName = productName;
        this.hash = hash.toString();
    }
}




var getGenesisBlock = (callback) => {

    callback(new Block(0, "0", 14556783, "owner", "consumer", "anything", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"));
}
module.exports.genBlock = (callback) => {

    Bl.getChain((err, reqChain) => {
        if (err) {

            callback(err, null);
        }
        else {
            if (reqChain.length == 0) {

                getGenesisBlock((res) => {

                    Bl.addBlockToChain(res, (err) => {
                        if (err) {
                            // console.log("err to add genesis block")
                            callback(err, null);
                        } else {

                            // console.log("Your genesis block is succesfully added");
                            callback(null, true);
                        }
                    });
                })

            }
        }

    })
}

module.exports.generateNextBlock = (blockData, callback) => {
    for (i = 0; i < 1000; i++);
    Bl.getLatestChain((err, reqChain) => {
        if (err) {
            console.log("error to get latest block");
            callback(err, null);
        }
        else {
            var preBlock = (reqChain[0])
            var nextIndex = preBlock.index + 1;
            var nextTimeStamp = new Date().getTime();
            //      console.log("Previous Hash: ");
            //      console.log(preBlock.hash);
            var Hash = SHA256(nextIndex + preBlock.hash + nextTimeStamp + blockData.to + blockData.from + blockData.productName).toString();
            //      console.log("new hash: ");
            ///     console.log(Hash);             
            var generatedBlock = new Block(nextIndex, preBlock.hash, nextTimeStamp, blockData.to, blockData.from, blockData.productName, Hash);
            callback(null, generatedBlock)

        }
    })
}


//calculate hash for blocks

var calculateHashForBlock = (block, callback) => {

    callback(SHA256(block.index + block.previousHash + block.timestamp + block.to + block.from + block.productName));
}


//add a block into blockchain
module.exports.addBlock = (newBlock, callback) => {
    console.log("New block: ");
    console.log(newBlock);
    Bl.getLatestChain((err, reqChain) => {
        if (err) {
            callback(err, null);
        }
        else {
            var latest = (reqChain[0]);

            isValidNewBlock(newBlock, latest, (res) => {
                if (res) {
                    Bl.addBlockToChain(newBlock, (err) => {
                        if (err) {
                            console.log("Error in adding block to chain");
                            callback(err, null);
                        } else {
                            console.log("Block successfully added to chain");

                            callback(null, true);
                        }
                    });

                } else {
                    callback(null, false);
                }
            });
        }
    })
}

var isValidNewBlock = (newBlock, previousBlock, callback) => {

    if (previousBlock.index + 1 != newBlock.index) {
        console.log("invalid index");
        callback(false);
    }
    else if (previousBlock.hash != newBlock.previousHash) {
        console.log("invalid previoushash")
        callback(false);
    }
    else {
        var inputBlock = JSON.parse(JSON.stringify(newBlock).split(" ")[0]);
        res = SHA256(inputBlock.index + inputBlock.previousHash + inputBlock.timestamp + inputBlock.from + inputBlock.to + inputBlock.productName);
        console.log(inputBlock.hash);
        console.log("new block -->>");
        console.log(res);
        if (res != newBlock.hash) {
            console.log("Invalid Hash");
            callback(false)
        }
        else
            callback(true);
    }
};



module.exports.responseLatestMsg = () => ({
    'data': getLatestBlock()
});
