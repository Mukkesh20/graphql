const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetTypeSchema = new Schema({
    name: String,
})

module.exports = mongoose.model('AssetType', AssetTypeSchema)