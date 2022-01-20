$(document).ready(function(){

  //   var ww = window.innerWidth,
  //       wh = window.innerHeight,
  //       $content = $('#content'),
  //       $item = $('.item'),
  //       $menuBtn = $('.menu-btn'),
  //       $mMenuList = $('.m-menu-list'),
  //       $headerWrapper = $('.header-wrapper');

  //   //$('.footer-wrapper').load('footer.html'); 

  //   $content.animate({ opacity: 1.2 });

  //   /* font modify */
  // var isLoadFont=1; //未載過字體
  // var fonttype="文鼎標準宋體_B";
  // function changeClass(){
  //   var userAgent = navigator.userAgent;
  //   var isChrome = userAgent.indexOf("Chrome") > -1 ;
  //   var isMobile = {
  //       Android: function () {
  //           return navigator.userAgent.match(/Android/i);
  //       },
  //       BlackBerry: function () {
  //           return navigator.userAgent.match(/BlackBerry/i);
  //       },
  //       iOS: function () {
  //           return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  //       },
  //       Opera: function () {
  //           return navigator.userAgent.match(/Opera Mini/i);
  //       },
  //       Windows: function () {
  //           return navigator.userAgent.match(/IEMobile/i);
  //       },
  //       any: function () {
  //           return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  //       }
  //   };

  //   // alert(userAgent);
  //   if(isChrome){
  //       if (isMobile.any()) {
  //         $('.WStdsong-B').addClass('WStdsong-H');
  //         $('.WStdsong-H').removeClass('WStdsong-B');
  //         // alert('chrome手機')
  //         fonttype="文鼎標準宋體_H";

  //       }
  //       // else{
  //       //   $('.WStdsong-B').addClass('WStdsong-E');
  //       //   $('.WStdsong-E').removeClass('WStdsong-B');
  //       //   fonttype="文鼎標準宋體_E";
  //       //   // alert('chrome電腦')
  //       // }
  //   }

  //   if(isLoadFont==1){
  //       //production site
  //       // $('body').append("<script type='text/javascript' src='//font.arphic.com/FontSubsetOutput/1473064767308/4D27756815E94E6DB05A95CD7F6D06AC/1473064767308.JS?2806519310'><\/script>");
  //       // //test site
  //       //$('body').append("<script type='text/javascript' src='//font.arphic.com/FontSubsetOutput/1473064767308/B0A974BD107CDB47346C03CA0600DA17/1473064767308.JS?9931643132'><\/script>");

  //       //$('body').append("<script src='js/lib/jquery.ARWebFont.js'><\/script>");
  //       //console.log('新增script碼');
  //       isLoadFont=0;
  //   }else{
  //       // console.log('已載過script碼，動態更新字體');
  //       // $(".block-title").ARWebFont({
  //       //     fontName:fonttype
  //       // });
  //   }


  // };


  //   /* font modify */
  //   changeClass();
    
    /* order menu items with even margin. markout cause its too annoying to change dynamically */
    /*
    if( $('#quickbuy-menu').length > 0 ){
        $('.menu-bottom > ul > li').css('padding', '0 45px 0 45px');
    }else{
        $('.menu-bottom > ul > li').css('padding', '0 60px 0 60px');
    }
    */


    /* account menu */
    // $('#account-menu').click(function(){
    //     $('.account-group').slideDown(300);
    // });

    // //會員
    // $('.account-group').mouseleave(function(){
    //     $(this).slideUp(300);
    // });

    // $('.menu-top').mouseleave(function(){
    //     if( $('.account-group').css('display') == 'block' ) {
    //         $('.account-group').slideUp(300);
    //     }
    // });


	$('.item-start').mouseenter(function(){
        var ww = window.innerWidth
        if ( ww > 1024) {
            $(this).parent().find('.item').fadeIn(300);
        }
	});

   // $('.cart-carry-btn').click(function(){
   //      $('.cart-form').fadeOut(400);
   //  });
/*
    $('.cart').click(function(){
        if( $('.desktop-fotm').css('display') == 'none' ) {
            $('.desktop-fotm').fadeIn(400);
        } else {
            $('.desktop-fotm').fadeOut(400);
        }
    });

    $('.m-cart').click(function(){
        if( $('.m-cart-form').css('display') == 'none' ) {
            $('.m-cart-form').fadeIn(400);
        } else {
            $('.m-cart-form').fadeOut(400);
        }
    });
*/

    /* 2017-7-25: comment out original index item menu  */
	// $item.mouseleave(function(){
 //        if ( ww > 1024) {
	// 	    $(this).fadeOut(200);
 //        }
	// });



    /* 2017-7-25: do this in menu.js  */
    //table search switch
    // $('.m-search-btn').on('click',function(){
    //     $headerWrapper.addClass('search-active');
    // });

    // $('.m-search-close-btn').on('click',function(){
    //     $headerWrapper.removeClass('search-active');
    // });

    // $menuBtn.on('click',function(){
    //     if ( $(this).hasClass('open-active') ) {
    //         $(this).removeClass('open-active');
    //         $mMenuList.removeClass('menu-open');
    //     } else {
    //         $(this).addClass('open-active');
    //         $mMenuList.addClass('menu-open');
    //     }
    // });

    // $content.on('click',function(){
    //     if ( $menuBtn.hasClass('open-active') ) {
    //         $menuBtn.removeClass('open-active');
    //         $mMenuList.removeClass('menu-open');
    //     }
    // });

    $('.scroll-btn').bind('click', function(event) {
        var top = $('.scroll-btn').offset().top;
        $('html, body').stop().animate({
            scrollTop: top-60 /* modify for index-slide-circle */
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    //full banner
    var swiper = new Swiper('#index-silde', {
        centeredSlides: true,
        paginationClickable: true,
        speed: 1200,
        autoplay: 4000,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        /*--modify index-slide-circle*/
        pagination : '.index-silde-circle',
        fade: {
          crossFade: false
        },
        onInit: function(swiper){ 
            swiperAnimateCache(swiper); 
            swiperAnimate(swiper); 
        }, 
        onSlideChangeEnd: function(swiper){ 
            swiperAnimate(swiper); 
        } 
    });

    //block banner1
    // var swiper1 = new Swiper('#block-slide1', {
    //     centeredSlides: true,
    //     paginationClickable: true,
    //     autoHeight: true,
    //     speed: 1000,
    //     autoplay: 1500,
    //     spaceBetween: 30,
    //     loop: true,
    // });



    /* 2017-7-25: do this in menu.js  */

    //add header active
    // if( $(window).scrollTop() >= 100 ) {
    // 	$headerWrapper.addClass('scroll-active');
    // } else {
    // 	$headerWrapper.removeClass('scroll-active');
    // }

    // mobileScroll();

    // function mobileScroll() {
    //     if( ww < 720 ) {
    //         var header = document.querySelector(".m-header-scroll");    
    //         new Headroom(header, {
    //           tolerance: {
    //             down : 2,
    //             up : 5
    //           },
    //           offset : 100,
    //           classes: {
    //             initial: "slide",
    //             pinned: "slide_reset",
    //             unpinned: "slide_up"
    //           },
    //           onPin : function() {
    //             $('.m-menu-top').addClass('no-border');

    //           },
    //           onUnpin : function() {
    //             $('.m-menu-top').removeClass('no-border');
    //           },
    //         }).init();
    //     }
    // }

 //    //scroll header active
 //    $(window).scroll(function (){
 //        if ( $headerWrapper.hasClass('search-active') ) {
 //            $headerWrapper.removeClass('search-active');
 //        } else {
 //            if( $(this).scrollTop() >= 100 ) {
 //                $headerWrapper.addClass('scroll-active');
 //                $content.addClass('scroll-active-margin');
 //            } else {
 //                $headerWrapper.removeClass('scroll-active');
 //                $content.removeClass('scroll-active-margin');
 //            }
 //        }
	// });

 //    $(window).resize(function() {
 //        ww = window.innerWidth;
 //        wh = window.innerHeight;
 //        mobileScroll();
 //    });


});