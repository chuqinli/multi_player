$(document).ready(function() {
	var vid = $('#my_video1')[0];
	var oldvol;
    $('#control1 .playbtn').click(function(){
    	vid.play();
    });
    $('#control1 .pausebtn').click(function(){
    	vid.pause();
    });
    $('#control1 .seekslider').on("input",function(){
		var seekto;
		seekto = vid.duration * ($('#control1 .seekslider')[0].value / 100);
		vid.currentTime = seekto;
	});
    $('#control1 .mutebtn').click(function(){
    	if(vid.volume == 0){
    		vid.volume = oldvol;
    		$('#control1 .volumeslider')[0].value = oldvol*100;
    		$('#control1 .mutebtn').css('backgroundImage','url(unmute.png)');
    	}else {
    		oldvol = vid.volume;
    		vid.volume = 0;
    		$('#control1 .volumeslider')[0].value = 0;
    		$('#control1 .mutebtn').css('backgroundImage','url(mute.png)');
    	}  	
    });
    $('#control1 .volumeslider').on("input",function(){
		vid.volume = $('#control1 .volumeslider')[0].value/100;
	});
	curtimetext = $('#control1 .curtimetext')[0];
    durtimetext = $('#control1 .durtimetext')[0];
    $('#my_video1').on("timeupdate",function(){
        console.log("video1 updated");
        //the innerhtml has problem here??????
        console.log(curtimetext.innerHTML);
        $('#control1 .seekslider')[0].value = vid.currentTime*(100 / vid.duration);
            var curmins = Math.floor(vid.currentTime / 60);
            var cursecs = Math.floor(vid.currentTime - curmins * 60);
            var durmins = Math.floor(vid.duration / 60);
            var dursecs = Math.floor(vid.duration - durmins * 60);
            if(cursecs < 10){ cursecs = "0"+cursecs; }
            if(dursecs < 10){ dursecs = "0"+dursecs; }
            if(curmins < 10){ curmins = "0"+curmins; }
            if(durmins < 10){ durmins = "0"+durmins; }
            curtimetext.innerHTML = "strange";
            curtimetext.innerHTML = curmins+":"+cursecs;
            durtimetext.innerHTML = durmins+":"+dursecs;
    });
});

