function write_cookie(cookie) {
    document.cookie = cookie.id_token + "||||" + cookie.user_id;
}

function read_cookie() {
	var guk = document.cookie.split(" ");
	var actual_cookie = guk[guk.length-1];
	var bits = actual_cookie.split("||||");
	var cookie = {
		id_token: bits[0],
		user_id: bits[1],
	}
	return cookie;
}

function validate_website() {
	var cookie = read_cookie();
	var id_token = cookie.id_token;

	$.ajax({
		url: "https://oauth2.googleapis.com/tokeninfo",
		type: "GET",
		data: { id_token: id_token },
		async: false,
		success: function(data){
			// if (data.aud != "1068940000938-e63k7elj04j3bk9a1pvq86sm66nkgbc0.apps.googleusercontent.com") {
			// 	window.location.href = "/login.html"; // Redirect
			// 	return;
			// }
			console.log("Token Valid");
		},

		error: function(err) {
			// window.location.href = "/login.html"; // Redirect
		}
	});
}

if (!window.location.href.includes("login.html")) { // Validate for all but the login page
	validate_website();
} else { // Fill out test data at the login page
	var cookie = read_cookie();
	cookie.id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE0MzEzZTdmZDFlOWUyYTRkZWQzYjI5MmQyYTdmNGU1MTk1NzQzMDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA2Mjc3NjI3MjUwNy1jdTNqcmZ2b2g1ODdzdmI5cXJpZnM3ZnFraGhzYzVycS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwNjI3NzYyNzI1MDctY3UzanJmdm9oNTg3c3ZiOXFyaWZzN2Zxa2hoc2M1cnEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ2MDU2NTY3NzAyMTAyMDU1NjUiLCJlbWFpbCI6IndhcmpyMTExMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IktJTXJ3X0FuczRpZHNqc2djeVdWYUEiLCJuYW1lIjoiU3RpY2t5UmljZSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWhPNVdyS3B2X2t3L0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmRuSGt6N0pPY3l0UE9kTnllRUpwQklrMVRZR1Evczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlN0aWNreVJpY2UiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU1Mzk3MzM5MywiZXhwIjoxNTUzOTc2OTkzLCJqdGkiOiI0ZjZiNjFmMWU5Y2U0ZTg2NWNiZWM1MzM3YmM4YmU4MjM2NjFlY2QwIn0.MyLFkkPwqsRwQ8-hl9kLJyb7x4Rikq6YYEHNjnuCMudzrW80pYXt-3TmDkVHfe_Dm5Dh4IzlNZg4aeAshh51KPkLdEn8J7iYh8kJO6MT3RNZXzkZb_WvhaMP2av96O08wJINB6v3nUSXaS3ulFPi4OPc85GV8vTE3eObJpBv61_Bu9HrneTdF4w5lQcKDcwdrj-FjiNojxGeW4N80ehgOgptYu-4ng4DnyTKDncdozHuPs7gewmi7blT7nYW3jiw-ouC_SWuQdTmMCAT1wVo33uxytWFKkVlytMoIFpCMhV49IMhfFojlHlQnuqscQpqvX6WjnSxSLY9O57EojlY_g";
	cookie.user_id = "104605656770210205565";
	write_cookie(cookie);

	$.ajax({
		url: "/update_listing",
		type: "POST",
		data: {
			user_id: cookie.user_id,
		},
		success: function(data) {
			console.log(data);
		}
	});
}
