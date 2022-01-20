$(document).ready(function(){

     //workaround for dotdotdot 40px height to work
    $('.box p').each(function(){
      $(this).text($(this).text().trim());
    });
    
    //put dotdot... when text is too long
    $('.box p').dotdotdot({
        ellipsis    : '... ',
    });

});