# Resume Video Demo 📽️

Hi! This is a demo of making videos resume even after closing the tab.


# What I did 🤔

I have used one of YouTubes template in embedding videos and tweaked some parts of it to allow users to still continue what they're watching even after closing the tab.

## The magic is in javascript! 🪄

If you'll check the `index.js`, you'll see the function called `onYouTubeIframAPIReady()`. What happens inside that function is that it loads the video using the `videoId` parameter once the `iframe API` is ready. The function then calls the `onPlayerReady()` function which checks if a cookie exist containing the `start` key then plays the video.

The `start` key inside the cookie is overwritten every 5 seconds using the `startCounting()` function. The value of the `start` key is generated by getting the current timestamp of the playing video using the `player.getCurrentTime()`. Take note that I used the Math.round() function to get rid of the decimals produced by `player.getCurrentTime()`.
