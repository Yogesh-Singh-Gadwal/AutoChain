var mongoose = require('mongoose');

const blockSchema = mongoose.Schema({
    previousHash:{
        type:String,
        required:true
    },
    timestamp:{
        type:Number,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    }
})


const BLOCK = module.exports = mongoose.model('block',blockSchema);

module.exports.addBlock = function(body,callback){
    BLOCK.create(body,callback);
}

module.exports.getChain = function(callback){
    BLOCK.find(callback);
}