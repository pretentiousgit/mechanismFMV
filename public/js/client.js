socket.on('connect', function(e) {
	//on connection, tell the server what kind of client you are. This is a listener.
	socket.emit('listener', function (error) {
		if (!error) return;
		socket.disconnect();
		$('#connection').trigger('disconnected');
		message('Server thinks only one listener can be connected'); // debug message
	});
});

socket.on('control event', function(e) {
	// connection passes server's current video number to listener clients
	if (e){ // needs to be adjusted slightly, does not detect if video is 1
		video_play(e);
		console.log(e);
	}

});

function video_play(to_id){
	var cur = document.getElementsByClassName('visible')[0];
	var cur_id= cur.id;
	var nxt = document.getElementById(to_id);
	var cur_byId=document.getElementById(cur_id);
	
	console.log(cur+' this is cur within video_swap');
	console.log(to_id+' play this');
	console.log(cur_id+' now stopped ');

	if(to_id!=cur_id){
		nxt.classList.remove('hidden'); 
		nxt.classList.add('visible');
		nxt.setAttribute("loop","true");

		cur.classList.add('hidden');
		cur.classList.remove('visible'); // for use with selectors
		cur.removeAttribute("loop");	

		if(nxt.nodeName=='VIDEO'){
			nxt.play();
		}
		if(cur_byId.nodeName=='VIDEO'){
			cur_byId.pause();
		}
	}
};