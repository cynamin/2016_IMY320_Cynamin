var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EventSchema = new Schema({
	title: String,
	allDay: { type: Boolean, default: true },
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Event', EventSchema)