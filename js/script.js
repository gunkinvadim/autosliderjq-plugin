$(function() {

    slider1 = new Slider({
        buttons: '.gallery-1 .button-action',
        stopBtn: '.gallery-1 .button-action[data-action="stop"]',
        autoNextBtn: '.gallery-1 .button-action[data-action="next-auto"]',
        autoPrevBtn: '.gallery-1 .button-action[data-action="prev-auto"]',
        images: '.gallery-1 .photos img',
        delayInput: '.gallery-1 .delay-input',
    });

    // slider2 = new Slider({
    //     buttons: '.gallery-2 .button-action',
    //     stopBtn: '.gallery-2 .button-action[data-action="stop"]',
    //     autoNextBtn: '.gallery-2 .button-action[data-action="next-auto"]',
    //     autoPrevBtn: '.gallery-2 .button-action[data-action="prev-auto"]',
    //     images: '.gallery-2 .photos img',
    //     delayInput: '.gallery-2 .delay-input',
    // });
});


function Slider(obj) {

    var slider = this;

    slider.buttons = $(obj.buttons);
    slider.stopBtn = $(obj.stopBtn);
    slider.autoNextBtn = $(obj.autoNextBtn);
    slider.autoPrevBtn = $(obj.autoPrevBtn);
    slider.images = $(obj.images);
    slider.delayInput = $(obj.delayInput);

    slider.delay = parseInt(slider.delayInput.val() * 1000);
    slider.i = 0;
    slider.action = 'stop';
    

    slider.delayInput.on('change', function() {
        slider.delay = parseInt(slider.delayInput.val() * 1000);
    });

    slider.buttons.on('click', function() {
        var buttonAction = $(this).attr('data-action');
        if (buttonAction == 'prev') {
            slider.action = 'prev';
            slider.prev();

        } else if (buttonAction == 'next') {
            slider.action = 'next';
            slider.next();

        } else if (buttonAction == 'prev-auto') {
            slider.action = 'autoprev';
            slider.prev(autoPrev);
            var autoPrev = setInterval(function() {slider.prev(autoPrev, autoNext);}, slider.delay);
    
            slider.buttonsDisable();
            slider.autoNextBtn.prop('disabled', false);
            slider.stopBtn.prop('disabled', false);

        } else if (buttonAction == 'next-auto') {
            slider.action = 'autonext';
            slider.next(autoNext);
            var autoNext = setInterval(function() {slider.next(autoPrev, autoNext);}, slider.delay);
    
            slider.buttonsDisable();
            slider.autoPrevBtn.prop('disabled', false);
            slider.stopBtn.prop('disabled', false);

        } else if (buttonAction == 'stop') {
            slider.action = 'stop';
        }
    });


    slider.prev = function(autoPrev, autoNext) {
        if (slider.action == 'stop') {
            slider.stop(autoPrev, autoNext);
            return;
        } else if (slider.action == 'autonext') {
            clearInterval(autoPrev);
            return;
        }

        slider.images.eq(slider.i).removeClass('showed');
        slider.i--;
        
        if(slider.i < 0){
            slider.i = slider.images.length - 1;
        }
        
        slider.images.eq(slider.i).addClass('showed');
    };

    slider.next = function(autoPrev, autoNext) {
        if (slider.action == 'stop') {
            slider.stop(autoPrev, autoNext);
            return;
        } else if (slider.action == 'autoprev') {
            clearInterval(autoNext);
            return;
        }

        slider.images.eq(slider.i).removeClass('showed');
        slider.i++;
        
        if(slider.i >= slider.images.length){
            slider.i = 0;
        }
        
        slider.images.eq(slider.i).addClass('showed');
    };

    slider.stop = function(autoPrev, autoNext) {
        clearInterval(autoPrev);
        clearInterval(autoNext);
        
        slider.buttonsEnable();
        slider.stopBtn.prop('disabled', true);
    };

    slider.buttonsDisable = function() {
        slider.buttons.prop('disabled', true);
        slider.delayInput.prop('disabled', true);
    };

    slider.buttonsEnable = function() {
        slider.buttons.prop('disabled', false);
        slider.delayInput.prop('disabled', false);
    };
}