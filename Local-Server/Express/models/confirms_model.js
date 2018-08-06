const mongoose  = require('mongoose');

const reqSchema = mongoose.Schema({
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    item:{
        type:Object,
        required:true
    }
});

const REQ = module.exports = mongoose.model("confirm",reqSchema);

module.exports.getAllReqs = function(callback){
    REQ.find(callback);
}

module.exports.addReqs = function(body,callback){
    REQ.create(body,callback);
}

module.exports.removeReqs= function(body,callback){
    REQ.findByIdAndRemove(body._id,callback);
}

module.exports.updateQty =function(body,callback){
    var query = {
        item:{
            productName:body.item.productName,
            qty:body.item.qty-1
        }
    }
    REQ.findByIdAndUpdate(body._id,query,callback);
}
