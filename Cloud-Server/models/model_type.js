const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true

    }
});


const Type = module.exports = mongoose.model('type', userSchema);



module.exports.addType = function (type, callback) {
    Type.create(type, callback);
}

module.exports.getTypeByType = function (type, callback) {
    let querry = {
        type: type
    }
    Type.findOne(querry, callback)
}

module.exports.getTypeByNumber = function (number, callback) {
    let querry = {
        number: number
    }
    Type.findOne(querry, callback)
}


module.exports.removeType = function (Id, callback) {
    Type.findByIdAndRemove(Id, callback)
}

module.exports.getTypeById = function (Id, callback) {
    Type.findById(Id, callback);
}