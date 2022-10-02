const mongoose = require("mongoose");
const randomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    avatar: { type: String, required: true },
})
module.exports = mongoose.model("random", randomSchema)