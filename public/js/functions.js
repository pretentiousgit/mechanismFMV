// functions.js currently requires jquery 1.9.1.

// turn on and off touchpoint colours dynamically over time of video after delay.
function activateTouchPoints(touch){
	$(touch).each(function(){
		var col = $(this).attr("colour")
		$(this).toggleClass(col);
	});
	
}

//if this video has been set to autoplay the next video in game_data, play the next video.
function liveTrace(spotDelay){
	var live = document.getElementsByClassName('visible')[0];
		live.addEventListener('timeupdate', function(){
			var now = live.currentTime;
			var delayVar = $('.sendVideo').attr('delay');
			// console.log("liveTrace "+ now +" "+ delayVar);	

			if (now == live.duration &&live.hasAttribute("playnext") ) {
				video_play(live.getAttribute("playnext"));
				load_spots(live.getAttribute("playnext"));				
				}

			if (now > delayVar ){
				$(".sendVideo").each(function(){
					var col = $(this).attr("colour")
					$(this).addClass(col);
					$(this).removeClass('hidden');
				});
			}
		})
}


// reveals a pre-loaded video and plays it. 
// Calls liveTrace() because this is required for delayed touchpoints.

function video_play(to_id){
	var cur = document.getElementsByClassName('visible')[0];
	var cur_id= cur.getAttribute('id');
	var nxt = document.getElementById(to_id);
	
	console.log(cur_id +' this is cur within video_swap');
	console.log(to_id+' play this');
	console.log(cur_id+' now stopped ');
	
	if (cur_id != to_id){
		nxt.classList.remove('hidden'); 
		nxt.classList.add('visible');
		if (!nxt.hasAttribute('playnext')){
			nxt.setAttribute("loop","true");
		}

		cur.classList.add('hidden');
		cur.classList.remove('visible'); // for use with selectors
		cur.load(); // reset to timecount 0
		if (cur.hasAttribute("loop"))
			{cur.removeAttribute("loop");}		

		if(nxt.nodeName=='VIDEO'){
			nxt.play();
			liveTrace();
		}
		if(cur.nodeName=='VIDEO'){
			cur.pause();
		}
	}	
};
