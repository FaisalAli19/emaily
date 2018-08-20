const mongoose = require('mongoose');
const { Schema } = mongoose;

const recepientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
})

module.exports = recepientSchema;