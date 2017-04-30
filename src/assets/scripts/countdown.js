/*
    COUNTDOWN.JS - Last updated: 30.04.17

    NOTES: - https://codepen.io/liquidvisual/pen/ZKKQeN
           - https://github.com/mckamey/countdownjs
*/
//-----------------------------------------------------------------
// COUNTDOWN
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // TARGET DATE
    //-----------------------------------------------------------------

    var targetDate = new Date("March 17, 2017 06:30:00");

    //-----------------------------------------------------------------
    // CREATE COUNTDOWN
    //-----------------------------------------------------------------

    function createCountdown() {

        var counterHTML = ''
        + '<ul class="block-grid-xs-3 block-grid-md-6">'
        // + '<li class="digit-box"><span class="digit" data-years></span><span class="text">Years</span></li>'
        + '<li class="digit-box"><span class="digit" data-months></span><span class="text">Months</span></li>'
        + '<li class="digit-box"><span class="digit" data-weeks></span><span class="text">Weeks</span></li>'
        + '<li class="digit-box"><span class="digit" data-days></span><span class="text">Days</span></li>'
        + '<li class="digit-box"><span class="digit" data-hours></span><span class="text">Hours</span></li>'
        + '<li class="digit-box"><span class="digit" data-minutes></span><span class="text">Minutes</span></li>'
        + '<li class="digit-box"><span class="digit" data-seconds></span><span class="text">Seconds</span></li>'
        + '</ul>';


          // + '<div class="countdown">'
          // + '<div class="digit-box"><div class="digit" data-years></div><div class="text">Years</div></div>'
          // + '<div class="digit-box"><div class="digit" data-months></div><div class="text">Months</div></div>'
          // + '<div class="digit-box"><div class="digit" data-weeks></div><div class="text">Weeks</div></div>'
          // + '<div class="digit-box"><div class="digit" data-days></div><div class="text">Days</div></div>'
          // + '<div class="digit-box"><div class="digit" data-hours></div><div class="text">Hours</div></div>'
          // + '<div class="digit-box"><div class="digit" data-minutes></div><div class="text">Minutes</div></div>'
          // + '<div class="digit-box"><div class="digit" data-seconds></div><div class="text">Seconds</div></div>'
          // + '</div>';

          $('[data-countdown]').html(counterHTML);
    }

    //-----------------------------------------------------------------
    // RUN IT
    //-----------------------------------------------------------------

    (function timerLoop() {

        var counter = countdown(targetDate, null, countdown.ALL);

        // IF PAST
        // if (counter.value < 0) {
            $('[data-years]').text(('0' + counter.years).slice(-2));
            $('[data-months]').text(('0' + counter.months).slice(-2));
            $('[data-weeks]').text(('0' + counter.weeks).slice(-2));
            $('[data-days]').text(('0' + counter.days).slice(-2));
            $('[data-hours]').text(('0' + counter.hours).slice(-2));
            $('[data-minutes]').text(('0' + counter.minutes).slice(-2));
            $('[data-seconds]').text(('0' + counter.seconds).slice(-2));


        // IF FUTURE
        // } else {
            // $('.countdown .digit').text('00'); // reset to ZERO
        // }

        requestAnimationFrame(timerLoop);
    })();

    //-----------------------------------------------------------------
    // INIT
    //-----------------------------------------------------------------

    createCountdown();

//--
}(jQuery));

//==================================================
//
//==================================================