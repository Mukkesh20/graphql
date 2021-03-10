const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetDataSchema = new Schema({
    type: String,
    subtype: String,
    name: String,
    code: String,
    risk: String,
    units: Number,
    avgPrice: Number ,
    currentPrice: Number,
    invested: Number,
    value: Number ,
})

module.exports = mongoose.model('AssetData', AssetDataSchema)