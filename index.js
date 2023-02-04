// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
var done = false;
let vidDuration;
let vidCounter = 1;

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'zqoj_3r9oqg',
		playerVars: {
			playsinline: 1,
		},
		events: {
			onReady: onPlayerReady,
			onStateChange: startCounting,
		},
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	if (getCookie('start') > vidDuration - 20) {
		event.target.seekTo(0);
	} else if (getCookie('start') != null) {
		event.target.seekTo(getCookie('start'));
	}
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function startCounting(event) {
	done = false;
	vidDuration = event.duration;
	setTimeout(function () {
		if (event.data == YT.PlayerState.PLAYING && !done) {
			console.log(Math.round(player.getCurrentTime()));
			document.cookie = 'start=' + Math.round(player.getCurrentTime());
			console.log('Cookie Content: ' + getCookie('start'));
			startCounting(event);
		}
		if (event.data == YT.PlayerState.PAUSED) {
			done = true;
		}
		if (event.data == YT.PlayerState.ENDED) {
			done = true;
			clearCookie('start');
		}
	}, 5000);
}

function getCookie(name) {
	let cookie = {};
	document.cookie.split(';').forEach(function (el) {
		let [key, value] = el.split('=');
		cookie[key.trim()] = value;
	});
	return cookie[name];
}

function clearCookie(name) {
	document.cookie = name + '=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
