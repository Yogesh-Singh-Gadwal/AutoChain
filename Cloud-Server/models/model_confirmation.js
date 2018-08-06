const mongoose = require ('mongoose');

const userSchema=mongoose.Schema({
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    item:{
        type:Object,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
});

//To name and export defined schema:
const Conf = module.exports = mongoose.model('confirmation',userSchema); // mongoose.model have 2 args: 1. collection name 2. schema name to be followed.



//Method to add user:
module.exports.addConf=function(user,callback){
    Conf.create(user,callback);
}

module.exports.removeConf = function(Id,callback){
Conf.findByIdAndRemove(Id,callback)
}

//method to find details in Confbase using ID:
module.exports.getConfById = function(Id,callback){
    Conf.findById(Id,callback);
}

module.exports.getNodeByUserName= function(userName,callback){
    let username={
         to:userName
     }
    Conf.find(username,callback)
}
module.exports.getNodeByUserFrom= function(userName,callback){
    let username={
         from:userName
     }
    Conf.find(username,callback)
}