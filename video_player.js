$(document ).ready(function(){
	var oldvol;
	var my_video = $('.my_video');
	var volumeHistory = {};
	$('#videos')[0].defaultValue = "video1";
	var volumeSelected = ["my_video1","my_video2"];
	$("#submit").click(function(){
		console.log($('#videos').val());
		if ($('#videos').val() == "video1"){
			$('#main_control .seekslider')[0].value = my_video[0].currentTime*(100 / my_video[0].duration);
			$('#main_control .volumeslider')[0].value = my_video[0].volume * 100;
		}
		else{
			$('#main_control .seekslider')[0].value = my_video[1].currentTime*(100 / my_video[1].duration);
			$('#main_control .volumeslider')[0].value = my_video[1].volume * 100;
		}
	});
	var playpause = function(){
		$(this)[0].paused ? $(this)[0].play() : $(this)[0].pause();
	};
	$('#my_video1').click(playpause);
	$('#my_video2').click(playpause);
	curtimetext = $('#main_control .curtimetext')[0];
	durtimetext = $('#main_control .durtimetext')[0];
	my_video.on("timeupdate",function(){
		if($(this)[0].paused){
			my_video.each(function(){
			$(this)[0].pause();
			});
		}
		if ($('#videos').val() == "video1"){
			$('#main_control .seekslider')[0].value = my_video[0].currentTime*(100 / my_video[0].duration);
			var curmins = Math.floor(my_video[0].currentTime / 60);
			var cursecs = Math.floor(my_video[0].currentTime - curmins * 60);
			var durmins = Math.floor(my_video[0].duration / 60);
			var dursecs = Math.floor(my_video[0].duration - durmins * 60);
			if(cursecs < 10){ cursecs = "0"+cursecs; }
			if(dursecs < 10){ dursecs = "0"+dursecs; }
			if(curmins < 10){ curmins = "0"+curmins; }
			if(durmins < 10){ durmins = "0"+durmins; }
			curtimetext.innerHTML = curmins+":"+cursecs;
			durtimetext.innerHTML = durmins+":"+dursecs;
		}
		else if($('#videos').val() == "video2"){
			$('#main_control .seekslider')[0].value = my_video[1].currentTime*(100 / my_video[1].duration);
			var curmins = Math.floor(my_video[1].currentTime / 60);
			var cursecs = Math.floor(my_video[1].currentTime - curmins * 60);
			var durmins = Math.floor(my_video[1].duration / 60);
			var dursecs = Math.floor(my_video[1].duration - durmins * 60);
			if(cursecs < 10){ cursecs = "0"+cursecs; }
			if(dursecs < 10){ dursecs = "0"+dursecs; }
			if(curmins < 10){ curmins = "0"+curmins; }
			if(durmins < 10){ durmins = "0"+durmins; }
			curtimetext.innerHTML = curmins+":"+cursecs;
			durtimetext.innerHTML = durmins+":"+dursecs;
		}
	});
	$('#main_control .playbtn').click(function(){
		my_video.each(function(){
			$(this)[0].play();
		});
	});
	var stop_points = [];
	var Stop = function(time,v1,v2){
		this.time = time;
		this.v1 = v1;
		this.v2 = v2;
	}
	var time = 0;
	$('#main_control .pausebtn').click(function(){
		my_video.each(function(){
			$(this)[0].pause();
		});
		time = time + 1;
		var points = new Stop(time,my_video[0].currentTime,my_video[1].currentTime);
		stop_points.push(points);
		console.log("time"+time);
		$('#dropContainer').append('<div class="dropOption" id="'+time+'">' + 
			"video1: " + my_video[0].currentTime + "s&nbsp;&nbsp;&nbsp;" +
			"video2: " + my_video[1].currentTime + 's</div>');
	});
	var currentReturn;
	$('#customDropdown').on('click', function(event){
		var container = $('#dropContainer');
		var drop = $('#customDropdown');
		var target = $(event.target);
		console.log(target.hasClass('dropOption'));
		if(target.hasClass('valueHolder') || target.attr('id') === 'customDropdown'){
			container.show();
			drop.find('span.valueHolder').text("Select an Option");
		}else if(target.hasClass('dropOption')){
			drop.find('span.valueHolder').text(target.text());
			console.log(target.attr('id'));
			currentReturn = target.attr('id');
			container.hide();
		}
	});
	$('#returnbtn').on('click',function(){
		console.log(currentReturn);
		var i = currentReturn;
		var v1 = $.map(stop_points, function(n) {
		    if (n.time == i)
		    { return n.v1;}
		});
		var v2 = $.map(stop_points, function(n) {
		    if (n.time == i)
		    { return n.v2;}
		});
		my_video[0].currentTime = v1;
		my_video[1].currentTime = v2;
	});
	$('#main_control .seekslider').on("input",function(){
		var seekto;
		if ($('#videos').val() == "video1"){
			seekto = my_video[0].duration * ($('#main_control .seekslider')[0].value / 100);
		}
		else{
			seekto = my_video[1].duration * ($('#main_control .seekslider')[0].value / 100);
		}
		my_video.each(function(){
			$(this)[0].currentTime = seekto;
		});
	});
	$('#btnGetVolume').click(function(){
		volumeSelected = ["my_video1","my_video2"];
		var result = $('#selectVolume input[type="checkbox"]');		
		if (result.length > 0){
			result.each(function(){
				var tempVal = $(this).val();
				console.log('tempVal='+tempVal);
				var videoPlayer = $('video[id="'+tempVal+'"]');
				if($(this).is(':checked')) {
					if(videoPlayer[0].volume == 0 ){
					videoPlayer[0].volume = volumeHistory[tempVal];
					}
				}
				else{
					var index = volumeSelected.indexOf(tempVal);
					volumeSelected.splice(index, 1);
					volumeHistory[tempVal] = videoPlayer[0].volume;
					videoPlayer[0].volume = 0;
				}
			});
			console.log(JSON.stringify(volumeHistory));
			console.log(volumeSelected);
		}
		else{
			console.log("default");
		}
	});
	var oldvol1,oldvol2,v1flag,v2flag;
	$('#main_control .mutebtn').click(function(){
		console.log(JSON.stringify(volumeHistory));
		v1flag = volumeSelected.indexOf("my_video1");
		v2flag = volumeSelected.indexOf("my_video2");
		if(v1flag != -1){
			if(my_video[0].volume == 0){
				my_video[0].volume = oldvol1;
				$('#main_control .mutebtn').css('backgroundImage','url(unmute.png)');
			} else {
				oldvol1 = my_video[0].volume;
				my_video[0].volume = 0;
				//$('#volumeslider')[0].value = 0;
				$('#main_control .mutebtn').css('backgroundImage','url(mute.png)');
			}
		}
		if(v2flag != -1){
			if(my_video[1].volume == 0){
				my_video[1].volume = oldvol2;
				$('#main_control .mutebtn').css('backgroundImage','url(unmute.png)');
			} else {
				oldvol2 = my_video[1].volume;
				my_video[1].volume = 0;
				//$('#volumeslider')[0].value = 0;
				$('#main_control .mutebtn').css('backgroundImage','url(mute.png)');
			}
		}
	});
	$('#main_control .volumeslider').on("input",function(){
		var old = $('#main_control .volumeslider')[0].value/100;
		console.log("old="+old);
		my_video.each(function(){
			var currentVolume = $(this)[0].volume;
			console.log("currentVolume="+currentVolume);
			$(this)[0].volume = old * currentVolume;
			console.log("new volume = " + $(this)[0].volume);	
			//$(this)[0].volume  = (old / $('#volumeslider')[0].value)* currentVolume;
		});
	});
	// $('#my_video1').mouseenter(function() {
	// 	if (!this.hasAttribute("controls")) {
	// 		this.setAttribute("controls","controls")   
	// 	}
	// });
	// $('#my_video1').mouseout(function() {
	// 	if (this.hasAttribute("controls")) {
	// 		this.removeAttribute("controls")   
	// 	}
	// });
	// $('#my_video2').mouseenter(function() {
	// 	if (!this.hasAttribute("controls")) {
	// 		this.setAttribute("controls","controls")   
	// 	}
	// });
	// $('#my_video2').mouseout(function() {
	// 	if (this.hasAttribute("controls")) {
	// 		this.removeAttribute("controls")   
	// 	}
	// });
});
