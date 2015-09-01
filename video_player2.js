

function registerPlayerCallbackEvents(id){

    var oldvol;
    var vid = $('#my_video'+id)[0];
    $('#control'+id+' .playbtn').click(function(){
            vid.play();
    });
    $('#control'+id+' .pausebtn').click(function(){
        vid.pause();
    });

    $('#control'+id+' .seekslider').on("input",function(){
        var seekto;
        seekto = vid.duration * ($(this)[0].value / 100);
        vid.currentTime = seekto;
    });

    $('#control'+id+' .mutebtn').click(function(){
        if(vid.volume == 0){
            vid.volume = oldvol;
            $('#control'+id+' .volumeslider')[0].value = oldvol*100;
            $(this).css('backgroundImage','url(unmute.png)');
        }else {
            oldvol = vid.volume;
            vid.volume = 0;
            $('#control'+id+' .volumeslider')[0].value = 0;
            $(this).css('backgroundImage','url(mute.png)');
        }   
    });

    $('#control'+id+' .volumeslider').on("input",function(){
        vid.volume = $(this)[0].value/100;
    });

    $('#my_video'+id).on("timeupdate",function(){
            updateTime(id,vid);
            
    });
}

function updateTime(id,vid) {
    console.log("updateTime called..");
    var curtimetext = $('#control'+id+' .curtimetext')[0];
    var durtimetext = $('#control'+id+' .durtimetext')[0];
    
        $('#control'+id+' .seekslider')[0].value = vid.currentTime*(100 / vid.duration);
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

}