$(document).ready(function(){
    // $("nav a:contains(‘母親節’), .hover:contains('母親節')").css("color","#6a8bea");
    // $("nav a:contains('地球日’), .hover:contains('地球日')").css("color","#da3450");
    // $("nav a:contains(‘滿500折100’), .hover:contains('滿500折100')").css("color","#6a8bea");
    // $("nav a:contains('解暑養生’), .hover:contains('解暑養生')").css("color","#da3450");
    var hdroom;
    var ww = window.innerWidth,
        wh = window.innerHeight
        $content = $('#content'),
        $menuBtn = $('.menu-btn'),
        $mMenuList = $('.m-menu-list'),
        $headerWrapper = $('.header-wrapper');
        mobileScroll()
    $content.animate({
        opacity: 1
    }, 1200, function() {
        if( ww < 720 ){
            // avoid subcategory title hidden by header_menu (this one is for "mobile" new page request scenario)
            //setTimeout(function(){window.scrollBy(0,10);}, 450);
        }
    });


    adjust_header_menu();
    var windw_scroll_y;

    /* font modify */
  var isLoadFont=1; //未載過字體
  var fonttype="文鼎標準宋體_B";
  function changeClass(callback){
    var userAgent = navigator.userAgent;
    var isChrome = userAgent.indexOf("Chrome") > -1 ;
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // alert(userAgent);
    if(isChrome){
        if (isMobile.any()) {
          $('.WStdsong-B').addClass('WStdsong-H');
          $('.WStdsong-H').removeClass('WStdsong-B');
          // alert('chrome手機')
          fonttype="文鼎標準宋體_H";

        }
        // else{
        //   $('.WStdsong-B').addClass('WStdsong-E');
        //   $('.WStdsong-E').removeClass('WStdsong-B');
        //   fonttype="文鼎標準宋體_E";
        //   // alert('chrome電腦')
        // }
    }

    if(isLoadFont==1){
        //production site
        // $('body').append("<script type='text/javascript' src='//font.arphic.com/FontSubsetOutput/1473064767308/4D27756815E94E6DB05A95CD7F6D06AC/1473064767308.JS?2806519310'><\/script>");
        //test site
        //$('body').append("<script type='text/javascript' src='//font.arphic.com/FontSubsetOutput/1473064767308/B0A974BD107CDB47346C03CA0600DA17/1473064767308.JS?9931643132'><\/script>");
        //$('body').append("<script src='js/lib/jquery.ARWebFont.js'><\/script>");
        //console.log('新增script碼');
        isLoadFont=0;
    }else{
        //console.log('已載過script碼，動態更新字體');
        // $(".block-title").ARWebFont({
        //     fontName:fonttype
        // });
    }

    //(1)to avoid blank header/footer in fix_header pages(login, one-page-form...), fire fix_mobile_header after font is loaded.
    //(2)however, in important pages, include 'css/style-dup-for-font.css' is more reliable
    setTimeout(callback, 800);
  };

    /* font modify */
    changeClass(fix_mobile_header);


    /* account menu */
    $('#account-menu').click(function(){
        $('.account-group').slideDown(300);
    });

    //會員
    $('.account-group').mouseleave(function(){
        $(this).slideUp(300);
    });

    $('.menu-top').mouseleave(function(){
        if( $('.account-group').css('display') == 'block' ) {
            $('.account-group').slideUp(300);
        }
    });

    /*
        menu layout according to window width
        1100px - above : desktop
        820px-1100px   : pad
        below 820px    : mobile
    */
    function is_desktop_width(ww){
        return ww > 1100;
    }
    function is_pad_width(ww){
        return ww > 820 && ww < 1100;
    }

    function is_mobile_width(ww){
        return ww < 820;
    }
        /* desktop sec-menu setup */
        if ($('.sec-menu-one').length > 0)
        {
            if($('#show_sublogo').val() == 'False'){
                $('.menu-bottom li:first-child a').attr('href', 'javascript:void(0)');
            }
        }
        if ($('.sec-menu-two').length > 0){
            if($('#show_sublogo').val() == 'False'){
                $('.menu-bottom li:nth-child(2) a').attr('href', 'javascript:void(0)');
            }
        }


        function adjust_header_menu(){
            var ww = window.innerWidth;
                hh = window.innerHeight;

            if(ww > 1100) {
              $('.m-secmenu').css('display', 'none');
            } else if(ww > 820 && ww < 1100){

              $('.m-secmenu').css('top', $('header').height());
            }else {
              $('.m-secmenu').css('top', '-3px');
            }
            $('.m-secmenu').css('height', function(){
                var height = hh - $('.m-menu-bottom').outerHeight(true) - $('.m-serach').outerHeight(true) - $('.m-menu-top').outerHeight(true) + 2;
                return height
            })


            if (is_desktop_width(ww)){
                $('.special-category-pad').remove();
                var item_menu_width = 100;
                var menu_one_width = $('.sec-menu-one ul').size() * 100;
                $('.sec-menu-one, .sec-menu-one .bg-groups').css('width', menu_one_width + 'px');
                var menu_two_width = $('.sec-menu-two ul').size() * 100;
                $('.sec-menu-two, .sec-menu-two .bg-groups').css('width', menu_two_width + 'px');
                
                //calculate sec-menu position
                var menu1_left = $('.menu-bottom li:first-child').offset().left;
                var menu2_left = $('.menu-bottom li:nth-child(2)').offset().left;
                var menu1_triangle_left = (menu_one_width > 100 )? 130 : 45;
                var menu2_triangle_left = (menu_two_width > 100 )? 130 : 45;
                var menu1_text_width = $('.menu-bottom li:first-child').width();
                var menu2_text_width = $('.menu-bottom li:nth-child(2)').width();
                var triangle_adj = 10; // some how this is  a magic number to adjust sec-menu postiion, which also aligns the triangle to menu title
                $('.sec-menu-one .triangle').css('left', menu1_triangle_left + 'px');
                $('.sec-menu-two .triangle').css('left', menu2_triangle_left + 'px');
                $('.sec-menu-one').css('margin-left', (menu1_left - menu1_triangle_left + menu1_text_width/2 + triangle_adj) + 'px');
                $('.sec-menu-two').css('margin-left', (menu2_left - menu2_triangle_left + menu2_text_width/2 + triangle_adj) + 'px');         
            }
            else if(is_pad_width(ww)){

                // ***0824 bremen edit
                // if (is_pad_width(ww) && ww >= 820){
                //     $('.special-category').remove();
                // }
                // $('.m-secmenu.second').hide();
                // $('.m-secmenu.first').hide();
                //
                // var item_cnt = $('.sec-menu-one .item').size();
                // var item_width_per = 100 / item_cnt;
                // var last_item_width_per = 100 - (item_cnt-1)*item_width_per;
                // $('.sec-menu-one .item, .sec-menu-one').removeAttr('style');
                // $('.sec-menu-one').css('display','none');
                // $('.sec-menu-one .item').css('width', item_width_per + '%');
                // $('.sec-menu-one .item').last().css('width', last_item_width_per + '%');
                //
                // item_cnt = $('.sec-menu-two .item').size();
                // item_width_per = 100 / item_cnt;
                // last_item_width_per = 100 - (item_cnt-1)*item_width_per;
                // $('.sec-menu-two .item, .sec-menu-two').removeAttr('style');
                // $('.sec-menu-two').css('display','none');
                // $('.sec-menu-two .item').css('width', item_width_per + '%');
                // $('.sec-menu-two .item').last().css('width', last_item_width_per + '%');
                $('.sec-menu-one').hide();
                $('.sec-menu-two').hide();


            }
            else if(is_mobile_width(ww)){
                $('.sec-menu-one').hide();
                $('.sec-menu-two').hide();
            }
        }





        detect_ipad_pro();
        function detect_ipad_pro() {
            var ww = window.innerWidth;
            $('.sec-menu-one, .sec-menu-two').css('display', 'none');

            $('.menu-bottom li:first-child, .menu-bottom li:nth-child(2)').off('mouseenter mouseleave click')
            var is_ipad_pro = false;
            if ( is_desktop_width(ww) && navigator.userAgent.match(/iPad/i) != null ) {
                is_ipad_pro = true;
            }

            console.log(is_ipad_pro)

            if(is_ipad_pro) {
              
                $('.menu-bottom li:first-child').click(function(){
                    $('.sec-menu-two').fadeOut(0);
                      console.log($('.sec-menu-one').css('display'))
                    if($('.sec-menu-one').css('display') == 'table') {
                        $('.sec-menu-one').fadeOut(0);
                  
                    }else {
                        if($('#show_sublogo').val() == 'False'){
                          $('.sec-menu-one').fadeIn(0).css('display','table');
                        }
                    }
                });   
                $('.menu-bottom li:nth-child(2)').click(function(){
                    $('.sec-menu-one').fadeOut(0);
                    if($('.sec-menu-two').css('display') == 'table') {
                        $('.sec-menu-two').fadeOut(0);
                    }else {
                        if($('#show_sublogo').val() == 'False'){
                          $('.sec-menu-two').fadeIn(0).css('display','table');
                        }
                    }
                });
            }else if(is_pad_width(ww)) {
                 $('.menu-bottom li:first-child').click(function(){
                      event.preventDefault(); //2016.07.15 eric add
                      detect_third_menu('first')
                      if( $('.m-secmenu.second').css('display') != 'none' ){
                        $('.m-secmenu.second').hide();
                      }
                      $('.m-secmenu.first').fadeToggle(300);

                });
                $('.menu-bottom li:nth-child(2)').click(function(){
                    var ww = window.innerWidth;
                      event.preventDefault(); //2016.07.15 eric add
                      detect_third_menu('second')
                      if( $('.m-secmenu.first').css('display') != 'none' ){
                        $('.m-secmenu.first').hide();
                      }
                      $('.m-secmenu.second').fadeToggle(300);


                });


            }else{
                $('.menu-bottom li:first-child').mouseenter(function(){
                    var ww = window.innerWidth
                    if ( is_desktop_width(ww)) {
                        if($('#show_sublogo').val() == 'False'){
                          $('.sec-menu-two').fadeOut(0);
                          $('.sec-menu-one').fadeIn(0).css('display','table');
                        }
                    }
                });  
                $('.menu-bottom li:nth-child(2)').mouseenter(function(){
                    var ww = window.innerWidth
                    if ( is_desktop_width(ww) ) {
                        if($('#show_sublogo').val() == 'False'){
                          $('.sec-menu-one').fadeOut(0);
                          $('.sec-menu-two').fadeIn(0).css('display','table');
                        }

                    }
                });
                //fadeout sec-menu when mouse leave
                $('.sec-menu-one, .sec-menu-two').mouseleave(function(){
                    var ww = window.innerWidth;
                    if ( is_desktop_width(ww)) {
                        $(this).fadeOut(300);
                    }
                });
                //fadeout sec-menu when mouseenter other title
                var last_childs = $('.menu-bottom li').size() - 2
                $('.menu-bottom li:nth-last-child('+ last_childs + ')').mouseenter(function(){
                    var ww = window.innerWidth
                    if ( is_desktop_width(ww) || is_pad_width(ww)) {
                        $('.sec-menu-one').fadeOut(0);
                        $('.sec-menu-two').fadeOut(0);

                    }
                });

            }
        }



        //  $('.m-menu-bottom li:first-child').click(function(){
        //     event.preventDefault(); //2016.07.15 eric add
        //     if( $('.m-secmenu').css('display') == 'none' ) {
        //         $('.m-secmenu').fadeIn(300);
        //     } else {
        //         $('.m-secmenu').fadeOut(300);
        //     }
        // });

        /* mobile level-2 m-secmenu */
        $('.m-menu-bottom li:first-child').click(function(){
            if ($('.m-secmenu.first').length > 0){
                event.preventDefault(); //2016.07.15 eric add
                detect_third_menu('first')
                if( $('.m-secmenu.second').css('display') != 'none' ){
                  $('.m-secmenu.second').hide();
                }

                $('.m-secmenu.first').fadeToggle(300);
            }

        });

        $('.m-menu-bottom li:nth-child(2)').click(function(){
            if ($('.m-secmenu.second').length > 0){
                event.preventDefault(); //2016.07.15 eric add
                detect_third_menu('second')
                if( $('.m-secmenu.first').css('display') != 'none' ){
                  $('.m-secmenu.first').hide();
                }
                $('.m-secmenu.second').fadeToggle(300);
            }

        });

        function detect_third_menu (block) {

          if(!$('html, body').hasClass("no-scroll")) {
            windw_scroll_y = $(window).scrollTop();
          }


          if(hdroom) {
            if($('.m-secmenu.'+block).css('display') == 'block') {
              hdroom.init();
                /*1013 bremen edit*/
              $('html, body').removeClass('no-scroll');
              window.scrollTo(0, windw_scroll_y);
            }else {
              hdroom.destroy();
                /*1013 bremen edit*/
              $('html, body').addClass('no-scroll');
            }
          }else {
            setTimeout(function() {
              detect_third_menu()
            }, 300);
          }



        }



        var prev_third_menu_item = "";
        $('.m-secmenu li').click(function() {
            third_menu_accordion($(this));
        })
        // 2017-9-6: don't close menu when 3-level item is clicked 
        $('.m-secmenu li td').click(function() {
            event.stopPropagation();
        })

        //第三層選單收合
        $('.m-thirdmenu-wrap').slideUp();
        function third_menu_accordion ($this){
            $('.m-secmenu li').removeClass('open');
            $('.m-thirdmenu-wrap').slideUp();
            if(prev_third_menu_item == $this.data('item')) {
                prev_third_menu_item = "";
                return;
            }else {
              console.log('!')
              $this.addClass('open');
              $this.find('.m-thirdmenu-wrap').slideDown();
            }
            prev_third_menu_item = $this.data('item');
        }




        $('.m-search-btn').click(function(){
            $headerWrapper.addClass('search-active');
        });

        $('.m-search-close-btn').click(function(){
            $headerWrapper.removeClass('search-active');
        });

        $('.menu-btn').click(function(){
            if ( $(this).hasClass('open-active') ) {
                $(this).removeClass('open-active');
                $('.m-menu-list').removeClass('menu-open');
            } else {
                $(this).addClass('open-active');
                $('.m-menu-list').addClass('menu-open');
            }
        });

        $content.on('click',function(){
            if ( $('.menu-btn').hasClass('open-active') ) {
                $('.menu-btn').removeClass('open-active');
                $('.m-menu-list').removeClass('menu-open');
            }
        });
        //購物車打開

        $('.cart-carry-btn').click(function(){
            $('.cart-form').fadeOut(400);
        });
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
    //});

    // var swiper1 = new Swiper('#block-slide1', {
    //     centeredSlides: true,
    //     paginationClickable: true,
    //     autoHeight: true,
    //     speed: 1000,
    //     autoplay: 1500,
    //     spaceBetween: 30,
    //     loop: true,
    // });

    //add header active
    if( $(window).scrollTop() >= 100 ) {
        $headerWrapper.addClass('scroll-active');
    } else {
        $headerWrapper.removeClass('scroll-active');
    }



    function mobileScroll() {
        var ww = window.innerWidth;
        if( ww < 720 ) {
            setTimeout(function(){
                var header = document.querySelector(".m-header-scroll");
                console.log(header);
                hdroom = new Headroom(document.querySelector(".m-header-scroll"), {
                  tolerance: {
                    down : 2,
                    up : 5
                  },
                  offset : 300,
                  classes: {
                    initial: "slide",
                    pinned: "slide_reset",
                    unpinned: "slide_up"
                  },
                  onPin : function() {
                    $('.m-menu-top').addClass('no-border');

                  },
                  onUnpin : function() {
                    $('.m-menu-top').removeClass('no-border');
                  },
                }).init();

                console.log(hdroom)
            }, 300);

        }

    }

    //To prevent annoying users in form filling pages, fix the header and hide search form .
    //see login_registration.html for example
    function fix_mobile_header(){
        if( $('#fixed_header_indicator').is(':visible') && $(window).width() < 720 ){ //search input will only hide when width < 720(as mobileScroll() indicated)
            //move content upper & hide search bar
            var search_height = $('.m-serach').height();
            $('.m-serach').hide();
            var mtop = $('#content').css('margin-top');
            value = mtop.replace('px', '');
            value = parseFloat(value) || 0;
            value -= search_height

            //temporary fix:   width 480~720 would hide partial header problem
            if ( $(window).width() > 480 ){
                value += 20;
            }
            //temporary fix end

            $('#content').css('margin-top', value+'px');

            //disable scroll function
            mobileScroll = function(){};
        }
    }

    //scroll header active
    $(window).scroll(function (){
        if ( window.innerHeight != hh ) {
          $('.m-secmenu').css('height', function(){
              var height = window.innerHeight - $('.m-menu-bottom').outerHeight() - $('.m-serach').outerHeight() - $('.m-menu-top').outerHeight();
            return height
          })
          console.log('!')
        }
        if ( $headerWrapper.hasClass('search-active') ) {
            $headerWrapper.removeClass('search-active');
        } else {

            if( $(this).scrollTop() >= 100 ) {
                $headerWrapper.addClass('scroll-active');
                $content.addClass('scroll-active-margin');
            } else {
                $headerWrapper.removeClass('scroll-active');
                $content.removeClass('scroll-active-margin');
            }
        }
        adjust_header_menu();
    });


    $(window).resize(function() {
        var ww = window.innerWidth;
        // mobileScroll();

        adjust_header_menu();
        detect_ipad_pro();
    });

    //alert popup
    $('#alert-popup .alert-close').click(function(){
        $('#alert-popup').fadeOut(300);
    });

    function alertPopup() {
        $('#alert-popup').fadeIn(300);
    }

    $('.header-line-btn').click(function(){
        var ww = window.innerWidth;
        if ( ww > 1024) {
            if( $(this).find('.line-popup').css('display') == 'none' ) {
                $(this).find('.line-popup').fadeIn(400);
            } else {
                $(this).find('.line-popup').fadeOut(400);
            }
        } else {
            location.href = 'http://line.me/ti/p/4yoI05jnKj';
        }
    });
});
