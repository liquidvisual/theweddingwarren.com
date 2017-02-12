/*
    SCROLL HIGHLIGHT - Last updated: 13.12.16

    - Notes -

     An alternative to Foundation's Magellan:
     http://jsfiddle.net/mekwall/up4nu/
*/
//-----------------------------------------------------------------
// Variables
//-----------------------------------------------------------------

var menuItems = $("[data-scroll-highlight]"); // All list items

//-----------------------------------------------------------------
// Bind to scroll
//-----------------------------------------------------------------

// Cache selectors
var lastId,
    topMenu = menuItems,
    topMenuHeight = topMenu.outerHeight()+90,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

//-----------------------------------------------------------------
// Bind click handler to menu items
// so we can get a fancy scroll animation
//-----------------------------------------------------------------

menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

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
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }

   // console.log($(this).scrollTop());

   // added hacky - rsvp is out of order for style reasons
   if ($(this).scrollTop() >= 4991) {
      $('a[href="#instagram"]').parent().addClass('active');
   } else {
      $('a[href="#instagram"]').parent().removeClass('active')
   }
});

//==================================================
//
//==================================================