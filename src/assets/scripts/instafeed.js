/*
    INSTAFEED.JS - Last updated: 30.05.17

    Notes:
    https://github.com/stevenschobert/instafeed.js/issues/408#issuecomment-224282075

    ** 30.05.17 **
    GET TOKEN - VERIFY THRU PASTING LOCAL HOST LINK:
    <a href="https://www.instagram.com/oauth/authorize/?client_id=72a673a02dc54fb4bad49d86255be764&redirect_uri=http://localhost:9000/past/&response_type=token&scope=public_content">Token</a>

    SEARCH 'BENWELTMAN' (10.27.16)
    -> https://github.com/stevenschobert/instafeed.js/issues/408
    GRABBED ACCESS TOKEN HERE
    -> http://instagramwordpress.rafsegat.com/docs/get-access-token/
*/
//-----------------------------------------------------------------
// USER FEED
//-----------------------------------------------------------------

// var feed = new Instafeed({
//     get: 'user',
//     userId: '2310206803', // https://smashballoon.com/instagram-feed/find-instagram-user-id/?username=danandmitch&5611zzl19832tjrl=4
//     clientId: '72a673a02dc54fb4bad49d86255be764', // from instagram
//     accessToken: '2310206803.ba4c844.a601ce28751f461f847384f5961a338b', // from http://instagramwordpress.rafsegat.com/docs/get-access-token/
//     resolution: 'standard_resolution',
//     // template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /><span>{{likes}}{{comments}}</span></a>',
//     template: '<li><a class="{{orientation}}" href="{{link}}" target="_blank"><span class="img" style="background-image: url({{image}})"></span><img width="100%" src="/assets/img/layout/instagram-placeholder.png"></a></li>',
//     sortBy: 'most-recent',
//     limit: 50,
//     links: false
// });

//-----------------------------------------------------------------
// OUTSIDE TAGGING
//-----------------------------------------------------------------

try {
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'theweddingwarren',
        accessToken: '2310206803.ba4c844.a601ce28751f461f847384f5961a338b',
        sortBy: 'most-recent',
        limit: '50',
        resolution: 'standard_resolution',
        template: '<li><a class="{{orientation}}" href="{{link}}" target="_blank"><span class="img" style="background-image: url({{image}})"></span><img width="100%" src="/assets/img/layout/instagram-placeholder.png"></a></li>'
    });

    feed.run();
}

catch (e) {
    // console.log('No Instagram');
}

//-----------------------------------------------------------------
// KEEP AS REFERENCE
//-----------------------------------------------------------------

// COAST SPORTS
// instagram: {
//     accounts: ['@coastpowersports'],
//     limit: 2,
//     //client_id: '88b4730e0e2c4b2f8a09a6184af2e218',
//     //access_token: ''
//     client_id: 'aa2ef3e8118541c0b7c372cfd81e752b',
//     access_token: '3178942332.e029fea.ab1887d8d8024dd69d8b1dafbbfa773b'
// },

//-----------------------------------------------------------------
//
//-----------------------------------------------------------------

// feed.run();

//==================================================
//
//==================================================