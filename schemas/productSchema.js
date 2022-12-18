const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    //_id: {type: mongoose.Schema.Types.ObjectId},
    _tag: {type: String},
    _name: {type: String, required: true},
    _description: {type: String},
    _category: {type: String},
    _price: {type: Number, required: true},
    _rating: {type: Number},
    _imageName: {type: String},
})

module.exports = mongoose.model("products", productSchema)