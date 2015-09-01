(function($) {

    $.fn.play = function() {

        return this.each( function() {
            $(this).play();
        });

    }

}(jQuery));