(function($){
    
    $.fn.mySlider = function(settings) {
    
        var defaults = {
            buttons: '.button-action',
            stopBtn: '.button-action[data-action="stop"]',
            autoNextBtn: '.button-action[data-action="next-auto"]',
            autoPrevBtn: '.button-action[data-action="prev-auto"]',
            images: '.photos img',
            delayInput: '.delay-input',
            show: 0,
            rate: 3000,
            auto: false
        };

        var options = $.extend(defaults, settings);


        var slider = $(this);

        var buttons = $(slider.find(options.buttons));
        var stopBtn = $(slider.find(options.stopBtn));
        var autoNextBtn = $(slider.find(options.autoNextBtn));
        var autoPrevBtn = $(slider.find(options.autoPrevBtn));
        var images = $(slider.find(options.images));
        var delayInput = $(slider.find(options.delayInput));
        
        var delay = options.rate || parseInt(delayInput.val() * 1000);
        var i = options.show;
        var action = 'stop';
        var isRun = false;
        var isAuto = options.auto;

        images.eq(i).show();

        function prev(autoPrev, autoNext) {
        
            if (action == 'stop') {
                stop(autoPrev, autoNext);
                return;
            } else if (action == 'autonext') {
                clearInterval(autoPrev);
                return;
            }
        
            images.eq(i).animate({
                left: '100%'
            }, 500);
            i--;
            
            if(i < 0){
                i = images.length - 1;
            }
            
            images.eq(i).css({
                display: 'block',
                left: '-100%'
            }).animate({
                left: 0
            }, 490, function(){
                isRun = false;
            });
        }
        
        function next(autoPrev, autoNext) {
        
            if (action == 'stop') {
                stop(autoPrev, autoNext);
                return;
            } else if (action == 'autoprev') {
                clearInterval(autoNext);
                return;
            }
        
            images.eq(i).animate({
                left: '-100%'
            }, 500);
            i++;
            
            if(i >= images.length){
                i = 0;
            }
            
            images.eq(i).css({
                display: 'block',
                left: '100%'
            }).animate({
                left: 0
            }, 490, function(){
                isRun = false;
            });
        }

        function prevAuto(autoPrev, autoNext) {
            prev(autoPrev);
            var autoPrev = setInterval(function() {prev(autoPrev, autoNext);}, delay);
    
            buttonsDisable();
            autoNextBtn.prop('disabled', false);
            stopBtn.prop('disabled', false);
        }

        function nextAuto(autoPrev, autoNext) {
            next(autoNext);
            var autoNext = setInterval(function() {next(autoPrev, autoNext);}, delay);
    
            buttonsDisable();
            autoPrevBtn.prop('disabled', false);
            stopBtn.prop('disabled', false);
        }

        if (isAuto) {
            action = 'autonext';
            nextAuto();
        }
        
        function stop(autoPrev, autoNext) {
            clearInterval(autoPrev);
            clearInterval(autoNext);
            
            buttonsEnable();
            stopBtn.prop('disabled', true);
            isRun = false;
        }
        
        function buttonsDisable() {
            buttons.prop('disabled', true);
            delayInput.prop('disabled', true);
        }
        
        function buttonsEnable() {
            buttons.prop('disabled', false);
            delayInput.prop('disabled', false);
        }
        
        
        delayInput.on('change', function() {
            if (isNaN(delayInput.val()) == true || delayInput.val() < 1) {
                delayInput.val(1);
            }
            delay = parseInt(delayInput.val() * 1000);
        });
        
        buttons.on('click', function() {
            var buttonAction = $(this).attr('data-action');
        
            if (buttonAction == 'stop') {
                action = 'stop';
            }
        
            if (isRun) {
                return;
            }
            isRun = true;
        
            if (buttonAction == 'prev') {
                action = 'prev';
                prev();
        
            } else if (buttonAction == 'next') {
                action = 'next';
                next();
        
            } else if (buttonAction == 'prev-auto') {
                action = 'autoprev';
                prevAuto();
        
            } else if (buttonAction == 'next-auto') {
                action = 'autonext';
                nextAuto();
        
            }
        });
    };
})(jQuery);

