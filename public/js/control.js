socket.on('connect', function () {
	socket.emit('role', 'control', function (error) {
		if (!error) return;
		  socket.disconnect();
		  $('#connection').trigger('disconnected');
		  message('There is already a control connected');
		});
});

$(document).on('click', '.sendVideo', function(e){
	var nxtVid = parseInt($(this).attr('nextVid'));
	video_play(nxtVid);

	$('#controlSpots').html('');
	$.getJSON('/tmp/'+nxtVid+'.json', function(data){
		$.each(data.spots, function(i,obj){
			console.log(obj);			
				var skeleton = $('<a class="sendVideo">&nbsp;</a>');
			        	$(skeleton).attr('nextvid', obj.link);
			        	$(skeleton).attr('style', obj.css);
			     $("#controlSpots").append(skeleton);
		})
	});

	message('emitted \'' + nxtVid + '\'');
    socket.emit('control event', nxtVid);

	return false;
});   	

/*
Notes from Dann

Look at how to blob out thumbnails from video as part of an uploading function

Go through http://daimio.org/demos/seqs/ and work on how control sequences work - add functionality, see how to make it work.
*/


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

		cur.classList.add('hidden');
		cur.classList.remove('visible'); // for use with selectors

		if(nxt.nodeName=='VIDEO'){
			nxt.play();
		}
		if(cur_byId.nodeName=='VIDEO'){
			cur_byId.pause();
		}
	}
};




