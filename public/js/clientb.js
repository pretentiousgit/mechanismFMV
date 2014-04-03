var videoQuant;
var videoList;

socket.on('connect', function(e) {
	//on connection, tell the server what kind of client you are. This is a listener.
	socket.emit('listener', function (error) {
		if (!error) return;
		socket.disconnect();
		$('#connection').trigger('disconnected');
		message('Server thinks only one listener can be connected'); // debug message
	});
});


socket.on('video quant',function(e) {
	videoQuant = e;
	console.log('number of videos '+ videoQuant);
});

socket.on('video list', function(e){
	videoList = e;
	console.log('videoList var '+ videoList);
})

socket.on('control event', function(e) {
	// connection passes server's current video number to listener clients
	if (e){
		screenControl(e, videoQuant);
		console.log(e);

		//  provide currentTime from playing video
		var updater = $('video.fullscreen');
		var vidObj = $('video.fullscreen')[0];
		var ts = $('#timestamp');

		ts.css('color','#FFF');
		updater.on('timeupdate', function() {
			ts.text(vidObj.currentTime);
			
		});
	}
	
});


function screenControl(video, finalVid) {
	
	// video container variables
     var videoNext = video,
    	 videoLast = video-1,
    	 videoLoad = video+1;

    // video object variables
    var videoA= $('#' + videoLast)[0],
		videoB= $('#' + videoNext)[0],
		videoC= $('#' + videoLoad)[0];

    $(this).attr('nextVid', videoNext);

	$('#'+ videoLast)
		.removeClass("fullscreen")
		.removeAttr("autoplay")
		.addClass("hidden")
		.removeAttr('loop')
	;

  	$('#'+ videoNext)
  		.removeClass("hidden")
  		.addClass("fullscreen")
  		.attr('loop',true)
  	;
	
	if (video > 1) {
		console.log('video '+video);
		videoA.pause();
	}
	else{
		console.log('final video '+finalVid);
		
		$('#'+ finalVid)
			.removeClass("fullscreen")
			.removeAttr("autoplay")
			.addClass("hidden")
			.removeAttr('loop')
		;

		$('#'+finalVid)[0].pause();
	}
  	
  	videoB.play();
    
}