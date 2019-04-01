function search_tweets() {
	var query = {
		all_of_these_words: $('#allWord').val(),
		this_exact_phrase: $('#phrase').val(),
		any_of_these_words: null,
		none_of_these_words: $("#excludeWords").val(),
		these_hashtags: $("#hashtags").val(),
		written_in: null,
		from_these_accounts: $("#from_these_accounts").val(),
		to_these_accounts: $("#to_these_accounts").val(),
		mentioning_these_accounts: $("#mentioning_these_accounts").val(),
		from: null,
		to: null,
	};

	$.ajax({
		url: "/search_tweets",
		type: "POST",
		data: {
			query: query
		},
		success: function(data){
			$("#tweet_container").empty();
			for (var i = 0; i < data.length; i ++) {
				$("#tweet_container").append(data[i]);
			}
		}
	});
}
