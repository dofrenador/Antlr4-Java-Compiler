$.ajax({
	url: "/find_listing",
	type: "POST",
	data: { user_id: read_cookie().user_id },
	async: false,
	success: function(data) {
		var woeid = data.woeid;

		$.ajax({
			url: "/get_trending",
			type: "POST",
			data: { woeid: woeid, count: 5 },
			async: false,
			success: function(data){
				var trend_data = data;

				for (var i = 0; i < trend_data.length; i ++) {
					$("#topic_list").append("<button class='accordion'>" + trend_data[i].name + "</button>");
					$("#topic_list").append(" \
					<div class='panel'> \
                        <div class='card-body'> \
                            <div class='container'> \
                                <div class='row' style='text-align:center;' id='section_" + i + "'> \
                                </div> \
                            </div> \
                        </div> \
					</div>");
					$.ajax({
						url: "/get_topic_cards",
						type: "POST",
						data: {
							trend_name: trend_data[i].name
						},
						async: false,
						success: function(data){
							for (var j = 0; j < data.length; j ++) {
								var tweet_element = "<div class='col-md-6 tweet'>";
								tweet_element += data[j];
								tweet_element += "</div>";
								$("#section_" + i).append(tweet_element);
							}
						}
					});
				}
			}
		});
	}
});
