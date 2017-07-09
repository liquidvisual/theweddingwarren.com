/*
    GALLERY.JS - Last updated: 30.05.17

    https://codepen.io/liquidvisual/pen/JNQbry?editors=1010
    https://github.com/aFarkas/lazysizes/issues/118
    https://codepen.io/aFarkas/pen/JdrXjm
    https://codepen.io/desandro/pen/NqNBxy
*/
//-----------------------------------------------------------------
// ISOTOPE
//-----------------------------------------------------------------

$(window).on('load', function() {

    if ($('[data-gallery]').length) createGallery(333, 4);
});

//-------------------------------------------------------
// CREATE GALLERY
//-------------------------------------------------------

function createGallery(totalPhotos, loadSets) {

    var $gallery;
    var loadTimer;
    var setsLoaded = 0;
    var totalSets = loadSets;
    var imagesLoadedPerSet = Math.ceil(totalPhotos/loadSets);

    //============================================
    // INIT
    //============================================

    function init() {

        // Load first, with the shell
        $gallery = $('<ul class="isotope-box popup-gallery block-grid-xs-2 block-grid-md-3 block-grid-lg-4 block-grid-condensed">'+renderItems(1, imagesLoadedPerSet)+'</ul>');

        $('[data-gallery]').append($gallery);

        // FIRST INSTANCE OF ISOTOPE
        runIsotope();

        setsLoaded++;

        // load subsequent over time for better performance
        loadTimer(4000);
    }

    //============================================
    // LOAD TIMER
    //============================================

    function loadTimer(interval) {
        loadTimer = setInterval(function(){
            if (setsLoaded < totalSets) {

                var startPos = imagesLoadedPerSet * setsLoaded + 1;

                setsLoaded++;

                var endPos = imagesLoadedPerSet * setsLoaded;

                // If the number is odd and the rounding exceeds total, cap off at total
                if (endPos > totalPhotos) endPos = totalPhotos;

                // console.log('setsLoaded: '+setsLoaded+' | startPos: '+startPos+' | endPos: '+endPos);

                var html = renderItems(startPos, endPos);
                var $html = $(html);
                $html.appendTo($gallery);

                // ISOTOPE INSERT
                $('.isotope-box').isotope('insert', $html);

            } else {

                // over reset
                console.log('Images loaded. Exiting');
                clearInterval(loadTimer);
            }

        }, interval);
    }

    //============================================
    // RENDER ITEMS
    //============================================

    function renderItems(startIndex, endIndex){
        var $galleryItems = '';

        // console.log('Start: '+startIndex + ' endIndex: '+endIndex);

        for (var i = startIndex; i < endIndex+1; i++) {
            var photoSrc = '//images.weserv.nl/?url=liquidvisual.net/theweddingwarren.com/gallery/photo-'+i+'.jpg';

                $galleryItems += '<li class="isotope-item" data-type="'+filter(i)+'">';
                $galleryItems +=        '<a title="Photo '+i+'" href="'+photoSrc+'&w=800&q=70">';
                $galleryItems +=            '<img class="lazyload" data-src="'+photoSrc+'&w=300&q=60">';
                $galleryItems +=        '</a>';
                $galleryItems += '</li>';
        }
        return $galleryItems;
    }

    //============================================
    //
    //============================================

    init();
}

//-----------------------------------------------------------------
// RUN ISOTOPE
//-----------------------------------------------------------------

function runIsotope() {
    console.log('Isotope engaged');
    $('.isotope-wrapper')
        .each(function(){

            var $isotope = $('.isotope-box', this);
            var $filterCheckboxes = $('input[type="radio"]', this);

            //==================================================
            // FILTER
            //==================================================

            var filter = function(){
                var type = $filterCheckboxes.filter(':checked').data('type') || '*';
                if (type !== '*'){
                    type = '[data-type="'+ type +'"]';
                }
                $isotope.isotope({ filter: type });
            };

            //==================================================
            //
            //==================================================

            $isotope.isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'masonry',
                transitionDuration: 0
            });

            //==================================================
            // LOAD
            //==================================================

            $isotope[0].addEventListener('load', (function(){
                $isotope.isotope('layout');
                var runs;
                var update = function(){
                  $isotope.isotope('layout');
                  runs = false;
                };
                return function(){
                  if(!runs){
                    runs = true;
                    setTimeout(update, 33);
                  }
                };
             }()), true);

            //==================================================
            // ON CHANGE
            //==================================================

            $(this).on('change', filter);
            filter();
        });


        // document.addEventListener('lazybeforeunveil', function(e){
        //     $('.isotope-box').isotope('layout');
        // });
}

//-----------------------------------------------------------------
// GALLERY EXPAND
//-----------------------------------------------------------------

$('[data-gallery-expand]').click(function(){
    $('.isotope-box').css('max-height', 'none');
    $(this).remove();
});

//-------------------------------------------------------
// ADHOC FILTER
//-------------------------------------------------------

function filter(i) {
    if (i <= 36 || i >= 61 && i <= 72) return 'preparation';
    if (i >= 37 && i <= 60) return 'bride-and-groom';
    if (i >= 73  && i <= 190) return 'ceremony';
    if (i >= 191 && i <= 333) return 'reception';
}

//==================================================
//
//==================================================