const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    prograd_id: { type: Number, required: true },
    squad: { type: Number, required: true }
})


module.exports = mongoose.model("mycollections", userSchema)