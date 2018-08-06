const mongoose  = require('mongoose');

const itemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    PID:{
        type:String,
        required:true,
    },
    dateAdded:{
        type:Date,
        default:new Date()
    },
    dateSold:{
        type:Date,
        required:false
    },
    finallySold:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        required:true
    },
    sold:{
        type:Boolean,
        default:false
    },
    uuid:{
        type:String,
        required:true
    }
});


const ITEM = module.exports = mongoose.model("item",itemSchema);

module.exports.addItem = function(item,callback){
ITEM.create(item,callback);
}

module.exports.updateSoldItem = function(item,callback){
    query  = {
        sold:true,
        dateSold:new Date()
    }
    ITEM.findByIdAndUpdate(item._id,query,callback);
}

module.exports.updateFinallySold = function(id,callback){
query = {
    finallySold:true
}
ITEM.findByIdAndUpdate(id,query,callback);
}

module.exports.getAllItems = function(callback){
    ITEM.find(callback);
}

module.exports.findItem = function(ids,callback){
    ITEM.findOne(id,callback);
}

module.exports.getItemByPid = function (pid, callback) {
     query = {
        PID: pid
    }
    ITEM.findOne(query, callback)
}
module.exports.getItemByID = function (id, callback) {
    ITEM.findById(id, callback);
}

module.exports.findItemByUUID = function(body,callback){

    query = {
        uuid:body.uuid
    }
    ITEM.findOne(query,callback);
}