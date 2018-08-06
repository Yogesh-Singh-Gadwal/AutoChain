const mongoose = require ('mongoose');

const blockSchema = mongoose.Schema({
    index:{
        type:Number,
        required:true
    },
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


const Chain = module.exports = mongoose.model('blockchain',blockSchema);

module.exports.addBlockToChain = function(body,callback){
    Chain.create(body,callback);
}

module.exports.getChain = function(callback){
    Chain.find(callback);
}

module.exports.getLatestChain = function(callback){
    let querry = {
        index:-1
    } 
    Chain.find(callback).find().sort(querry).limit(1);
}
