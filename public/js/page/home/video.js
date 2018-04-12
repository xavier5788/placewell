var onYouTubeIframeAPIReady = (function(){
var player;
document.getElementById("youtube-video").src = "https://www.youtube.com/embed/zQhebmpWuUY?rel=0&controls=0&showinfo=0&enablejsapi=1";
function onYouTubeIframeAPIReady() {
		player = new YT.Player('youtube-video',{
			events: {
				'onStateChange': function(event) {
					if (event.data == YT.PlayerState.ENDED) { container.close(); opener.open(); }
				}
			}
		});
	}

	var hero = jzmn(".hero-contents");
	var opener = jzmn.hideable("#video-link");
	var closer = jzmn.hideable("#video-hider");
	var container = jzmn.hideable("#video-container",true);

	opener.on("click",function(e){
		e.preventDefault();
		container.value[0].style.height = (9 / 16 * hero.value[0].offsetWidth) + 50 + "px";
		container.open();
		player.playVideo();
		opener.close();
	})
	closer.on("click",function(){
		player.pauseVideo();
		container.close();
		opener.open();
	})

	return onYouTubeIframeAPIReady;
})();

(function(){
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();
