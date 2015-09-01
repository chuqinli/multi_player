$(document).ready(function() {
	var vid = $('#my_video2')[0];
	var oldvol;
    $('#control2 .playbtn').click(function(){
    	vid.play();
    });
    $('#control2 .pausebtn').click(function(){
    	vid.pause();
    });
    $('#control2 .seekslider').on("input",function(){
		var seekto;
		seekto = vid.duration * ($('#control2 .seekslider')[0].value / 100);
		vid.currentTime = seekto;
	});
    $('#control2 .mutebtn').click(function(){
    	if(vid.volume == 0){
    		vid.volume = oldvol;
            $('#control2 .volumeslider')[0].value = oldvol*100;
    		$('#control2 .mutebtn').css('backgroundImage','url(unmute.png)');
    	}else {
    		oldvol = vid.volume;
    		vid.volume = 0;
            $('#control2 .volumeslider')[0].value = 0;
    		$('#control2 .mutebtn').css('backgroundImage','url(mute.png)');
    	}  	
    });
    $('#control2 .volumeslider').on("input",function(){
		vid.volume = $('#control2 .volumeslider')[0].value/100;
	});
    curtimetext = $('#control2 .curtimetext')[0];
    durtimetext = $('#control2 .durtimetext')[0];
    $('#my_video2').on("timeupdate",function(){
        $('#control2 .seekslider')[0].value = vid.currentTime*(100 / vid.duration);
            var curmins = Math.floor(vid.currentTime / 60);
            var cursecs = Math.floor(vid.currentTime - curmins * 60);
            var durmins = Math.floor(vid.duration / 60);
            var dursecs = Math.floor(vid.duration - durmins * 60);
            if(cursecs < 10){ cursecs = "0"+cursecs; }
            if(dursecs < 10){ dursecs = "0"+dursecs; }
            if(curmins < 10){ curmins = "0"+curmins; }
            if(durmins < 10){ durmins = "0"+durmins; }
            curtimetext.innerHTML = curmins+":"+cursecs;
            durtimetext.innerHTML = durmins+":"+dursecs;
    });
});
