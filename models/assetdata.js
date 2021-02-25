const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetDataSchema = new Schema({
    type: String,
    subtype: String,
    name: String,
    invested: Number,
    value: Number ,
})

module.exports = mongoose.model('AssetData', AssetDataSchema)