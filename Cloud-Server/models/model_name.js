const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true

    }
});


const Name = module.exports = mongoose.model('productName', userSchema);



module.exports.addName = function (name, callback) {
 
    Name.create(name, callback);
}

module.exports.getNameByName = function (name, callback) {
    let querry = {
        productName: name
    }
    Name.findOne(querry, callback)
}

module.exports.getNameByNumber = function (number, callback) {
    let querry = {
        number: number
    }
    Name.findOne(querry, callback)
}


module.exports.removeName = function (Id, callback) {
    Name.findByIdAndRemove(Id, callback)
}

module.exports.getNameById = function (Id, callback) {
    Name.findById(Id, callback);
}