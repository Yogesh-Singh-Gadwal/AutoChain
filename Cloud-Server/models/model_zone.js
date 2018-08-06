const mongoose = require ('mongoose');

const userSchema=mongoose.Schema({
    zone:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true

    }
});


const Zone = module.exports = mongoose.model('zone',userSchema); 



module.exports.addZone=function(zone,callback){
    Zone.create(zone,callback);
}

module.exports.getZoneByName= function(zone,callback){
    let querry = {
        zone:zone
    }  
    Zone.findOne(querry,callback)
}

module.exports.getZoneByNumber = function (number, callback) {
    let querry = {
        number: number
    }
    Zone.findOne(querry, callback)
}


module.exports.removeZone = function(Id,callback){
Zone.findByIdAndRemove(Id,callback)
}

module.exports.getZoneById = function(Id,callback){
    Zone.findById(Id,callback);
}
