const mongoose = require ('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    retailer:{
        type:String,
        required:true
    }
});

//To name and export defined schema:
const Node = module.exports = mongoose.model('node',userSchema); // mongoose.model have 2 args: 1. collection name 2. schema name to be followed.
//the collection name created will be [User=users]


//Method to get all users:

module.exports.getAllNode = function(callback){
    Node.find(callback);
}

//Method to add user:
module.exports.addNode=function(node,callback){
    Node.create(node,callback);
}

module.exports.removeNode = function(Id,callback){
Node.findByIdAndRemove(Id,callback)
}


//method to find details in Database using Username
module.exports.getNodeByUserName= function(userName,callback){
    let querry = {
        username:userName
    }  
    Node.findOne(querry,callback)
}


//method to find details in Database using ID:
module.exports.getNodeById = function(Id,callback){
    Node.findById(Id,callback);
}


module.exports.UpdatePassword = function(node,callback){
    let update = {
        password: node.password
    }
    Node.findByIdAndUpdate(node._id,update,callback)
}