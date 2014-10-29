$(function() {

    $('[data-icheck]').each(function() {
        var $this = $(this);
        var target = $this.data('icheck');

        $this.iCheck({
            checkboxClass: target,
            radioClass: target,
            checkedClass: target + '_checked',
            disabledClass: target + '_disabled',
            enabledClass: target + '_enabled',
            hoverClass: target + '_hover',
            focusClass: target + '_focus',
            activeClass: target + '_active',
            cursor: true,
            aria: true
        });
    });

    $('[data-nouislider]').each(function() {
        var $this = $(this);

        $this.noUiSlider({
        	start: 80,
            step: 10,
        	range: { 'min': 0, 'max': 100 }
        });
    });


});
