/*
    SCROLL HIGHLIGHT - Last updated: 10.06.17

    - Notes -

     An alternative to Foundation's Magellan:
     http://jsfiddle.net/mekwall/up4nu/
     replace with: https://codepen.io/rpora/pen/wBaLPp
*/
//-----------------------------------------------------------------
// Variables
//-----------------------------------------------------------------

var menuItems = $("[data-scroll-highlight]"); // All list items

//-----------------------------------------------------------------
// Bind to scroll
//-----------------------------------------------------------------

// Cache selectors
var lastId;
var topMenu = menuItems;
var topMenuHeight = topMenu.outerHeight()+60;

// All list items
var menuItems = topMenu.find("a");

// Anchors corresponding to menu items
var scrollItems = menuItems.map(function(){
  var item = $($(this).attr("href").slice(1));
  if (item.length) { return item; }
});

//-----------------------------------------------------------------
// ON CLICK
//-----------------------------------------------------------------

$('.topbar .top-parent-anchor').click(function(event) {
    var id = $(this).attr('href').slice(1);
    var endPos = $(id);
    id == '#home' ? $.scrollTo(endPos, 300) : $.scrollTo(endPos.offset().top-60, 300);
    return false;
});

//-----------------------------------------------------------------
// ON SCROLL
//-----------------------------------------------------------------

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='/#"+id+"']").parent().addClass("active");
   }

    //==================================================
    // added hacky - rsvp is out of order for style reasons
    //==================================================

    if ($(this).scrollTop() >= 4290) {
        $('a[href="/#credits"]').parent().addClass('active');
    }
    else if ($(this).scrollTop() >= 4991) {
        $('a[href="/#instagram"]').parent().addClass('active');
    } else {
        $('a[href="/#instagram"]').parent().removeClass('active');
        $('a[href="/#credits"]').parent().removeClass('active');
    }
});

//==================================================
//
//==================================================