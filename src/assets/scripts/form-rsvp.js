/*
    FORM-RSVP.JS - Last updated: 30.11.16
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //-----------------------------------------------------------------
    // VARIABLES
    //-----------------------------------------------------------------

    var jsonObj;
    var guestCount           =  1;
    var $formPrep            =  $('#form-prep');
    var $formRSVP            =  $('#form-rsvp');

    // STORE IT FOR FUTURE
    var $formEntry           =  $('.form-rsvp-entry'); // init - gets removed after
    var formEntryString      =  '<div class="form-rsvp-entry animated flipInX">' + $formEntry.html() + '</div>';

    //-----------------------------------------------------------------
    // STEP 01: CREATE FORM
    //-----------------------------------------------------------------

    function createForm(command) {

    	if (command == 'init') { // init
    		$formEntry.remove();
    		//http://stackoverflow.com/questions/25938585/find-and-replace-all-instances-of-a-word-with-jquery
    		var newString = formEntryString.replace(/{i}/g,guestCount); // replace all {i}
    		$formRSVP.prepend($(newString));

    	} else {
			guestCount ++;
			// console.log(guestCount);
			var newString = formEntryString.replace(/{i}/g,guestCount); // replace all {i}
			var newForm = $(newString).insertAfter($('.form-rsvp-entry').last());
    	}
    	setupButtons();
    }

    createForm('init');

    //-----------------------------------------------------------------
    // MODIFY GUEST ENTRY
    //-----------------------------------------------------------------

    function modifyGuestEntry($target, command) {
    	if (command == 'add') {
    		createForm();
    	}
    	else if (command == 'remove') {

			$target.parent().remove();
			guestCount--;
			setupButtons();
			// console.log('r '+guestCount);
    	}
    }

    //-----------------------------------------------------------------
    // SETUP BUTTONS - RUN EACH TIME FORM CREATED OR REMOVED
    //-----------------------------------------------------------------

    function setupButtons() {

    	var $addGuestBtn = $('[data-add-guest]');
    	var $removeGuestBtn = $('[data-remove-guest]');
    	var $attendingRadio = $('[data-form-group-attending] input[type=radio]');
    	var $formGroupExcuse = $('[data-form-group-excuse]');

        $formRSVP.validator('destroy').validator();

    	//==================================================
    	// Prevent remove if single entry
    	//==================================================

    	if (guestCount == 1) {
    		$removeGuestBtn.first().attr('disabled', true);
    	} else {
    		$removeGuestBtn.removeAttr('disabled');
    	}

    	//==================================================
    	// Show the add button only on the latest entry
    	//==================================================

    	if ($addGuestBtn.length > 1) {
    		$addGuestBtn.not(":last").hide();
            $addGuestBtn.last().show();
    	} else {
    		$addGuestBtn.show();
    	}

    	//==================================================
    	// ADD/REMOVE CLICKS
    	//==================================================

    	$addGuestBtn.unbind('click').click(function(){
			modifyGuestEntry($(this), 'add');
    	});

    	$removeGuestBtn.unbind('click').click(function(){
    		modifyGuestEntry($(this), 'remove');
    	});

    	//==================================================
    	// RESHUFFLE
    	//==================================================

    	$('.form-rsvp-entry').each(function(index){
    		$(this).find('h3').text('Guest '+Number(index+1));
    	});

    	//==================================================
    	// RESHUFFLE
    	//==================================================

    	$attendingRadio.unbind('click').click(function(){
    		var val = $(this).val();

    		if (val == 'Yes') {
    			$(this).parent().parent().parent().parent().parent().find('[data-form-group-excuse]').addClass('hidden').removeClass('animated bounceIn');
    			$(this).parent().parent().parent().parent().parent().parent().find('[data-fieldset-additional]').removeClass('hidden').addClass('animated bounceIn');
    		} else {
    			$(this).parent().parent().parent().parent().parent().find('[data-form-group-excuse]').removeClass('hidden').addClass('animated bounceIn');
    			$(this).parent().parent().parent().parent().parent().parent().find('[data-fieldset-additional]').addClass('hidden').removeClass('animated bounceIn');
    		}
    	});
    }

    //-----------------------------------------------------------------
    // STEP 02. CREATE JSON
    //-----------------------------------------------------------------

    function createJSON() {
        jsonObj = [];
        $('.form-rsvp-entry').each(function(index) {

            var name       =  $('[id*=name]', $(this)).val();
            var attending  =  $('[data-form-group-attending] input[type=radio]:checked').val();
            var excuse     =  $('[data-form-group-excuse] select').val();
            var dietary    =  $('[id*=dietary-requirements]', $(this)).val();
            var song       =  $('[id*=song]', $(this)).val();

            var item = {}
            	item.id = index;
           		item.name = name;
           		item.attending = attending;
           		item.excuse = excuse;
           		item.dietary = dietary;
           		item.song = song;

            jsonObj.push(item);
        });
        //console.log(jsonObj);
    }

    //-----------------------------------------------------------------
    // STEP 03. SEND FORM(S)
    //-----------------------------------------------------------------

    $formRSVP.on('submit', function(event){
        var $form = $(this);
        var $submitBtn = $('button[type=submit]');

        event.preventDefault();

        if ($submitBtn.hasClass('disabled')) {
            console.log('Error');
            return;
        }

        // event.stopPropagation();

        createJSON();

        console.log('disabling btn');

        $submitBtn.addClass('is-sending').attr('disabled', true);

        // console.log($form.serializeArray());

        $.ajax({
                type: 'POST',
                url: 'http://www.liquidvisual.net/hotlinking/rsvp.php',
                data: {myData:jsonObj},
                cache: false,
                success: function(feedback){
                    $formRSVP[0].reset();
                    $formRSVP.fadeOut();
                    $('#form-rsvp-success').removeAttr('hidden').addClass('animated bounceIn');
                    scrollTo('#rsvp-now');
                    // console.log(feedback);
                    // alert(form.serialize());

            } // success
        }); // ajax
    });

//--
}(jQuery));

//==================================================
//
//==================================================