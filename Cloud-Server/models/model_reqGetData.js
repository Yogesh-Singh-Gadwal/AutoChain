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
const DT = module.exports = mongoose.model('reqResData',userSchema); // mongoose.model have 2 args: 1. collection name 2. schema name to be followed.



//Method to add user:
module.exports.addData=function(user,callback){
    DT.create(user,callback);
}

module.exports.removeData = function(Id,callback){
DT.findByIdAndRemove(Id,callback)
}

//method to find details in Database using ID:
module.exports.getDataById = function(Id,callback){
    DT.findById(Id,callback);
}

module.exports.getreqGetDataByUserName= function(userName,callback){
    let username={
         to:userName
     }
    DT.find(username,callback)
}
