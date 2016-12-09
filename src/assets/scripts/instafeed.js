/*
    INSTAFEED.JS - Last updated: 06.11.16

    Notes:
    https://github.com/stevenschobert/instafeed.js/issues/408#issuecomment-224282075
*/
//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

$(function() {

    //-----------------------------------------------------------------
    // WINDOW LOAD
    //-----------------------------------------------------------------

    // $(window).on('load', function() {
        // feed.run();
    // });

    //-----------------------------------------------------------------
    // USER FEED WITH TAG FILTER
    //-----------------------------------------------------------------

    // var feed = new Instafeed({
    //     get: 'user',
    //     userId: '4439352',
    //     accessToken: '4439352.ba4c844.758ad5eee4c24cc9b4fcba88813c6920',
    //     limit: '50',
    //     resolution: 'standard_resolution',
    //     template: '<li><a class="" href="{{link}}" target="_blank"><img width="100%" src="{{image}}"></a></li>',
    //     filter: function(image) {
    //       return image.tags && image.tags.indexOf('theweddingwarren') >= 0;
    //     }
    // });

    //-----------------------------------------------------------------
    // OUTSIDE TAGGING
    //-----------------------------------------------------------------

    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'theweddingwarren',
        accessToken: '4439352.ba4c844.758ad5eee4c24cc9b4fcba88813c6920',
        sortBy: 'most-recent',
        limit: '50',
        resolution: 'standard_resolution',
        template: '<li><a class="{{orientation}}" href="{{link}}" target="_blank"><span class="img" style="background-image: url({{image}})"></span><img width="100%" src="/assets/img/layout/instagram-placeholder.png"></a></li>'
    });

    feed.run();

    //-----------------------------------------------------------------
    //
    //-----------------------------------------------------------------

//--
});

//==================================================
//
//==================================================