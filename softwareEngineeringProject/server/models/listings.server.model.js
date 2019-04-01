/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
	user_id: {
		type: String,
		required: true,
		unique: true
	},
	woeid: {
		type: Number,
		required: true,
	},
	region_name: {
		type: String,
		required: true,
	}
});

/* create a 'pre' function for no reason */
listingSchema.pre('save', function(next) {
	next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
