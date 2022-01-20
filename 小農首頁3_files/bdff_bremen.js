var oscar = (function(o, $) {
    
    o.messages = {
        addMessage: function(tag, msg) {
            if($('#alert-popup').css('display') == 'none')
            {
              $('#alert-popup').fadeIn('slow');
              
              setTimeout(function() {
                  $('#alert-popup').fadeOut('slow');
              }, 4000);
              
              setTimeout(function() {
                  $('.alert-info').remove();
              }, 6000);
            }              
            var msgHTML = '<div class="alert-info alert-' + tag + '">' + msg +
                '</div>';
            $('#alert-popup').append($(msgHTML));
        },
        debug: function(msg) { o.messages.addMessage('debug', msg); },
        info: function(msg) { o.messages.addMessage('info', msg); },
        success: function(msg) { o.messages.addMessage('success', msg); },
        warning: function(msg) { o.messages.addMessage('warning', msg); },
        error: function(msg) { o.messages.addMessage('error', msg); },
        clear: function() {
            $('#messages').html('');
        },
        scrollTo: function() {
            $('html').animate({scrollTop: $('#messages').offset().top});
        }
    };
    
    o.basket = {
        is_form_being_submitted: false,
        init: function(options) {
            if (typeof options == 'undefined') {
                options = {'basketURL': document.URL};
            }
            o.basket.url = options.basketURL || document.URL;
            $('#content_inner').on('click', '#basket_formset a[data-behaviours~="remove"]', function(event) {
                o.basket.checkAndSubmit($(this), 'form', 'DELETE');
                event.preventDefault();
            });
            $('#content_inner').on('click', '#basket_formset a[data-behaviours~="save"]', function(event) {
                o.basket.checkAndSubmit($(this), 'form', 'save_for_later');
                event.preventDefault();
            });
            $('#content_inner').on('click', '#saved_basket_formset a[data-behaviours~="move"]', function(event) {
                o.basket.checkAndSubmit($(this), 'saved', 'move_to_basket');
            });
            $('#content_inner').on('click', '#saved_basket_formset a[data-behaviours~="remove"]', function(event) {
                o.basket.checkAndSubmit($(this), 'saved', 'DELETE');
                event.preventDefault();
            });
            $('#content_inner').on('click', '#voucher_form_link a', function(event) {
                o.basket.showVoucherForm();
                event.preventDefault();
            });
            $('#content_inner').on('click', '#voucher_form_cancel', function(event) {
                o.basket.hideVoucherForm();
                event.preventDefault();
            });
            $('#content_inner').on('submit', '#basket_formset', o.basket.submitBasketForm);
            
            //added for bdff instant change
            $('#content_inner').on('change', '.line_quantity', function(event) {
                o.basket.lineQuantityChange($(this));                
            });
            
            if (window.location.hash == '#voucher') {
                o.basket.showVoucherForm();
            }
        },
        
        lineQuantityChange: function($ele) {          
          var name = $ele.attr('name'); //use name in class to sync  desktop and mobile line quantities
          var qty = $ele.val();
          //alert(name + qty );          
          $('.'+name).val(qty);
          o.basket.submitBasketForm()
        },
        
        submitBasketForm: function(event) {
            $('#messages').html('');
            var payload = $('#basket_formset').serializeArray();
            //$.post(o.basket.url, payload, o.basket.submitFormSuccess, 'json');
            
            //lock interface
            uiLock('Calculating...');
            
            $.ajax({
              type: 'POST',
              url: o.basket.url,
              data: payload,
              success: o.basket.submitFormSuccess,
              dataType: 'json',
              async:true
            });

            if (event) {
                event.preventDefault();
            }
        },
        submitFormSuccess: function(data) {
            $('#content_inner').html(data.content_html);
            
            uiUnlock();

            // Show any flash messages
            o.messages.clear();
            for (var level in data.messages) {
                for (var i=0; i<data.messages[level].length; i++) {
                    o.messages[level](data.messages[level][i]);
                }
            }
            o.basket.is_form_being_submitted = false;

            // fix me: repeat popup again to temporary fix unable to popup after ajax
            $('.popup-btn').click(function(){ 
                //calculate popup_top to center popup in the middle vertically
                header_height = $('.header-wrapper').height();
                //mobile version
                if(header_height == 0){
                    header_height = $('.m-menu-top').height();
                    if ( ! $('.m-header-scroll').hasClass('slide_up') ){
                        header_height = header_height + $('.m-serach').height() + $('.m-menu-bottom').height();
                    }
                } 
                scrollHeight = $(document).scrollTop();
                y = scrollHeight + header_height + 10;
                $('#popup .table').css('top',y);
                
            
                $('#popup').fadeIn(300, function() {
                    $('#popup .table').addClass('fadeInUp');
                }); 
            });

            //popup-close
            $('.popup-close,.mask').click(function(){ 
                $('#popup').fadeOut(300, function() {
                    $('#popup .table').removeClass('fadeInUp');
                }); 
            });

            //hide redundant shipping-tags
            $('.compute-block li .shipping').each(function(idx) {
                if(idx > 0) $(this).hide();
            });
        },
        showVoucherForm: function() {
            $('#voucher_form_container').show();
            $('#voucher_form_link').hide();
        },
        hideVoucherForm: function() {
            $('#voucher_form_container').hide();
            $('#voucher_form_link').show();
        },
        checkAndSubmit: function($ele, formPrefix, idSuffix) {
            if (o.basket.is_form_being_submitted) {
                return;
            }
            var formID = $ele.attr('data-id');
            var inputID = '#id_' + formPrefix + '-' + formID + '-' + idSuffix;
            $(inputID).attr('checked', 'checked');
            $ele.closest('form').submit();
            o.basket.is_form_being_submitted = true;
        }
    };

    o.quickbuy = {
        is_form_being_submitted: false,
        csrf_token:'',
        init: function(options) {
            if (typeof options == 'undefined') {
                options = {'quickbuyURL': document.URL};
            }
            o.quickbuy.url = options.quickbuyURL || document.URL;
            csrf_token = options.csrf_token || '';

            //popup
            $('.buy-btn').click(function(){ 
                
                o.quickbuy.submitBasketForm($(this).attr('id').substring(4));

            });

        },
        submitBasketForm: function( pid) {
            $('#messages').html('');
            var payload = $('#basket_formset').serializeArray();
            //$.post(o.basket.url, payload, o.basket.submitFormSuccess, 'json');
            
            //lock interface
            uiLock('Calculating...');
            
            $.ajax({
              type: 'POST',
              url: o.quickbuy.url,
              data: {"product_id":pid, "csrfmiddlewaretoken": csrf_token},
              success: o.quickbuy.submitFormSuccess,
              dataType: 'json',
              async:true
            });

            if (event) {
                event.preventDefault();
            }
        },
        submitFormSuccess: function(data) {
            $('#popup').html(data.content_html);
            
            uiUnlock();
            scrollHeight = $(document).scrollTop();
            header_height = $('.m-menu-top').height();
            if ( ! $('.m-header-scroll').hasClass('slide_up') ){
                header_height = header_height + $('.m-serach').height() + $('.m-menu-bottom').height();
            }
            pop_top = scrollHeight + header_height + 10;

            /* popup出現 */
            $('html,body').stop().animate({  }, '800', 'swing', function() { 
                $("#popup .table").css({
                     "top": pop_top 
                });

                $('#popup').fadeIn(300, function() {
                    $('#popup .table').addClass('fadeInUp');
                }); 
            });
            /* popup關閉 */
            $('.popup-close,.mask').click(function(){ 
                $('#popup').fadeOut(300, function() {
                    $('#popup .table').removeClass('fadeInUp');
                }); 
            });  

            /* 產品說明鈕*/
            $('.block-info').find('.block-note').click(function(){
                var $qaContent = $(this).next('div.pro-info');
                if(!$qaContent.is(':visible')){
                    $('.blick-info .pro-info:visible').slideUp();
                    $('.blick-info .block-note').removeClass('title-on');
                }
                $qaContent.slideToggle();
                $(this).toggleClass('title-on');
            }).siblings().addClass('pro-info').hide();            


            o.quickbuy.is_form_being_submitted = false;
        }
    };

    o.aboutbdff = {
        is_form_being_submitted: false,
        popup_y:0,
        csrf_token:'',
        init: function(options) {
            if (typeof options == 'undefined') {
                options = {'aboutbdffURL': document.URL};
            }
            o.aboutbdff.url = options.aboutbdffURL || document.URL;
            csrf_token = options.csrf_token || '';
            
            //producer use ajax popup
            $('#producer_block .click-pic').click(function(){      
                var position = $(this).offset();   
                popup_y = position.top; 
                name = $(this).children('.name').first().text();
                o.aboutbdff.submitAboutForm(name);
            });            

            //staff use local popup
            $('#staff_block .click-pic').click(function(){      
                var position = $(this).offset();   
                popup_y = position.top; 
           
                name = $(this).children('.name').first().text();
                //alert(JSON.stringify(json_dump[name]));
                person = staff_json[name];
                $('#popup .name').text(person.name);
                $('#popup .post').text(person.role);
                $('#popup .info article').text(person.intro);
                img_src = $(this).find('img').attr('src');
                $('#popup .top .pic img').removeAttr("src").attr("src",img_src);
                $('#popup .bottom').remove();
                o.aboutbdff.showPopup();

            });   

        },
        submitAboutForm: function( name) {
             //lock interface
            uiLock('Calculating...');
            
            $.ajax({
              type: 'POST',
              url: o.aboutbdff.url,
              data: {"producer_name":name, "producer_products":producer_n_products[name], "csrfmiddlewaretoken": csrf_token},
              success: o.aboutbdff.submitFormSuccess,
              dataType: 'json',
              async:true
            });

            if (event) {
                event.preventDefault();
            }
        },
        submitFormSuccess: function(data) {
            $('#popup').html(data.content_html);
            uiUnlock();
            o.aboutbdff.showPopup();
            o.aboutbdff.is_form_being_submitted = false;
        },
        showPopup:function(){
            // $('#popup .table').css('top','50%');
            // $('#popup .table').css('margin-top','-' + pop_height/2 );

            $('#popup .table').css('top',popup_y);
            //need to display the popup first to calculate related numbers
            $('#popup').fadeIn(300, function() {
                $('#popup .table').addClass('fadeInUp');
                //calculate popup_top to center popup in the middle vertically
                header_height = $('.header-wrapper').height();
                //mobile version
                if(header_height == 0){
                    header_height = $('.m-menu-top').height();
                    if ( ! $('.m-header-scroll').hasClass('slide_up') ){
                        header_height = header_height + $('.m-serach').height() + $('.m-menu-bottom').height();
                    }
                } 
                popup_height = $('.popup-info').height() + $('.popup-info .bottom').height();
                screen_top = $(document).scrollTop();
                screen_height = $(window).height();
                popup_top = screen_top + header_height + (screen_height -header_height)/2 - popup_height/2;
                if (popup_top <=  (screen_top + header_height) ) popup_top = screen_top + header_height + 100 ;
                
                $('#popup .table').css('top',popup_top);
            }); 

            //bind popup-close button
            $('.popup-close,.mask').click(function(){ 
                $('#popup').fadeOut(300, function() {
                    $('#popup .table').removeClass('fadeInUp');
                }); 
            });             

        },
    };  
    
    
    o.init = function() {
        //o.forms.init();
        //o.page.init();
        //o.responsive.init();
        //o.responsive.initSlider();
        //o.compatibility.init();
    };

    return o;
    
})(oscar || {}, jQuery);    


var uiLock = function(content){            
            if(content == 'undefined') content = '';
            $('#uiLockId').show();           
        };
        
var uiUnlock = function(){
    $('#uiLockId').hide();
};

/***** smooth anchor  **/

$(function(){
    $(document).on('click', '#anchor1', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top-115
        }, 500);
    });
});


$(function(){
    $(document).on('click', '#anchor2', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top-100
        }, 500);
    });
});



/*** sticky side button */

// $(function(){
//     var button, contentCtr;
  
//     button = document.querySelector(".cta");
  
  
//     button.addEventListener("click", function () {
//       var header;
//       header = this.parentElement.parentElement;
//       header.classList.toggle("active");
//       return;
//     });
  
  
//   });
  

// $(document).ready(function(){

//   $('.popup-btn1').click(function(){
//     var position = $('.popup-btn1').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup1 .table').css('top',y-260);  
//     $('#popup1').fadeIn(300, function() {
//         $('#popup1 .table').addClass('fadeInUp');
//     }); 
//   }); 

//   $('.popup-btn2').click(function(){
//     var position = $('.popup-btn2').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup2 .table').css('top',y-260);  
//     $('#popup2').fadeIn(300, function() {
//         $('#popup2 .table').addClass('fadeInUp');
//     }); 
//   });

//   $('.popup-btn3').click(function(){
//     var position = $('.popup-btn3').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup3 .table').css('top',y-260);  
//     $('#popup3').fadeIn(300, function() {
//         $('#popup3 .table').addClass('fadeInUp');
//     }); 
//   });

//   $('.popup-btn4').click(function(){
//     var position = $('.popup-btn4').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup4 .table').css('top',y-260);  
//     $('#popup4').fadeIn(300, function() {
//         $('#popup4 .table').addClass('fadeInUp');
//     }); 
//   });

//   $('.popup-btn5').click(function(){
//     var position = $('.popup-btn5').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup5 .table').css('top',y-260);  
//     $('#popup5').fadeIn(300, function() {
//         $('#popup5 .table').addClass('fadeInUp');
//     }); 
//   });

//   $('.popup-btn6').click(function(){
//     var position = $('.popup-btn6').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup6 .table').css('top',y-260);  
//     $('#popup6').fadeIn(300, function() {
//         $('#popup6 .table').addClass('fadeInUp');
//     });     
//   });

//   $('.popup-btn7').click(function(){
//     var position = $('.popup-btn7').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup7 .table').css('top',y-260);  
//     $('#popup7').fadeIn(300, function() {
//         $('#popup7 .table').addClass('fadeInUp');
//     }); 
//   });

//   $('.popup-btn8').click(function(){
//     var position = $('.popup-btn8').offset();  
//     var x = position.left;  
//     var y = position.top; 
//     $('#popup8 .table').css('top',y-260);  
//     $('#popup8').fadeIn(300, function() {
//         $('#popup8 .table').addClass('fadeInUp');
//     }); 
//   });

//     //popup-close
//     $('.popup-close,.mask').click(function(){ 
//         $('#popup1').fadeOut(300, function() {
//             $('#popup1 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup2').fadeOut(300, function() {
//             $('#popup2 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup3').fadeOut(300, function() {
//             $('#popup3 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup4').fadeOut(300, function() {
//             $('#popup4 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup5').fadeOut(300, function() {
//             $('#popup5 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup6').fadeOut(300, function() {
//             $('#popup6 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup7').fadeOut(300, function() {
//             $('#popup7 .table').removeClass('fadeInUp');
//         }); 
//     }); 

//     $('.popup-close,.mask').click(function(){ 
//         $('#popup8').fadeOut(300, function() {
//             $('#popup8 .table').removeClass('fadeInUp');
//         }); 
//     }); 


// });


$(document).ready(function(){

    var swiper = new Swiper('#block-gropp-slide', {
        centeredSlides: true,
        paginationClickable: true,
        autoHeight: true,
        speed: 800,
        autoplay: false,
        loop: true,
        prevButton: '.block-gropp-prev',
        nextButton: '.block-gropp-next',
        onSlideChangeStart: function(swiper){
            var $thumb = $('.thumb li');
            var index = (swiper.activeIndex - 1) % (swiper.slides.length - 2);
            $thumb.removeClass('active');
            $thumb.eq(index).addClass('active');
        }
    });

    var $thumbGroup = $('.thumb li');

    $thumbGroup.on('click',function(){
    	$thumbGroup.removeClass('active');
    	$(this).addClass('active');
    	var index = $(this).index()+1;
    	swiper.slideTo(index, 800);
    });
    
});
