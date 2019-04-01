var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'no.reply.5583to@gmail.com',
    pass: '8675309FF'
  }
});

var Twit = require('twit')

var T = new Twit({
	consumer_key:         'GVKZERdxjQgdfTufq3zhGkRXm',
	consumer_secret:      'jImRS1xCQm3MF5qouJRtW3ifphfru8Hi9t1rKzstK9rHlEzIvx',
	access_token:         '2852289612-UmtNYPl8th35NqOQoH2Enpa45934bCvC084tGoo',
	access_token_secret:  '6VSUj0E88PTSmR1ma7FahSBIoVzWA26fW2LbClT8bBo76',
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

var mongoose = require('mongoose'),
Listing = require('../models/listings.server.model.js');




exports.send_email = function(req, res) {
	name = req.body.name;
	email = req.body.email;
	issues = req.body.issues;

	var mailOptions = {
		from: 'no.reply.5583to@gmail.com',
		to: 'jrudaitis@outlook.com',
		subject: 'Issue Report',
		text: "RESPOND TO: " + email + '\n' + issues
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	res.send("OK");
}

exports.get_trending = function(req, res) {
	var num_topics = req.body.count;
	T.get('trends/place', { id: req.body.woeid }, function(err, data, response) {
		data = data[0].trends;
		var best_topics = []
		for (var i = 0; i < data.length; i++) {
			if (data[i].tweet_volume != null) {
				if (best_topics.length < num_topics) { // Initial topics
					best_topics.push(data[i]);
				} else {
					var worst = 0;
					for (var k = 1; k < num_topics; k++) { // Find the worst topic in best_topics
						if (best_topics[k].tweet_volume < best_topics[worst].tweet_volume) {
							worst = k;
						}
					}

					if (best_topics[worst].tweet_volume < data[i].tweet_volume) { // Remove the worst and insert data[i]
						best_topics.splice(worst, 1);
						best_topics.push(data[i]);
					}
				}
			}
		}
		res.send(best_topics);
	});
}

exports.get_topic_cards = function(req, res) {
	var num_topic_cards = 2;
	T.get('search/tweets', { q: req.body.trend_name, count: num_topic_cards, result_type:"popular" }, function(err, data, response) {
		if (data.statuses == null) {
			res.status(400);
			res.send([]);
			return;
		}
		var html_list = [];
		recurse_get_topic_cards(data.statuses, html_list, res);
	});
}

function recurse_get_topic_cards(statuses, html_list, res) {
	if (statuses.length == 0) {
		res.send(html_list);
		return;
	}

	status = statuses.pop();
	var url = 'https://twitter.com/statuses/' + status.id_str;

	T.get('statuses/oembed', { id: status.id_str }, function(err, html, response) {
		html_list.push(html.html);
		recurse_get_topic_cards(statuses, html_list, res);
	});
}

exports.get_regions = function(req, res) {
	T.get('trends/available', function(err, data, response) {
		res.send(data);
	});
}

exports.update_listing = function(req, res) {
	var upsertData = Listing(req.body);

	Listing.findOne({ user_id: upsertData.user_id }, function(err, listing) {
		if (listing == null) {
			upsertData.woeid = 1;
			upsertData.region_name = "Worldwide"; // Defaults
		} else {
			upsertData._id = listing._id;
		}

		Listing.update({ user_id: upsertData.user_id }, upsertData, {upsert: true}, function(err, listing) {
			if (err) {
				console.log(err);
				res.status(400);
				res.end("Something went wrong");
				return;
			}
			res.send("OK");
		});
	});
}

exports.find_listing = function(req, res) {
	Listing.findOne({ user_id: req.body.user_id }, function(err, listing) {
		if (err) {
			console.log(err);
			res.status(400);
			res.end("Could not find listing");
			return;
		}
		if (listing == null) {
			res.status(400);
			res.end("Could not find listing");
			return;
		}

		res.send(listing._doc);
	});
}

exports.search_user = function(req, res) {
	T.get('users/search', { q: req.body.query, count: 100 }, function(err, data, response) {
		res.send(data);
	});
}


function format_query(q) {
	var result = '';
	if (q.written_in) 					result += "l:" + q.written_in;
	if (q.all_of_these_words) 			result += " " + q.all_of_these_words;
	if (q.this_exact_phrase) 			result += " \"" + q.this_exact_phrase + "\"";
	if (q.any_of_these_words) 			result += " " + q.any_of_these_words.split(/\s/).join(" OR ");
	if (q.none_of_these_words) 			result += " -" + q.none_of_these_words.split(/\s/).join(" -");
	if (q.these_hashtags) 				result += " #" + q.these_hashtags.split(/[#\s]/).join(" #");
	if (q.from_these_accounts) 			result += " from:" + q.from_these_accounts.split(/\s/).join(" from:");
	if (q.to_these_accounts) 			result += " to:" + q.to_these_accounts.split(/\s/).join(" to:");
	if (q.mentioning_these_accounts) 	result += " @" + q.mentioning_these_accounts.split(/[@\s]/).join(" @");
	if (q.since) 						result += " since:" + q.since;
	if (q.until) 						result += " until:" + q.until;
	return result;
}

exports.search_tweets = function(req, res) {
	var query = format_query(req.body.query);
	T.get('search/tweets', { q: query, count: 2 }, function(err, data, response) {
		var html_list = [];
		recurse_get_topic_cards(data.statuses, html_list, res);
	});
}
