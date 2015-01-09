/*  JavaScript */

var thumbnailSpacing = 25;


$(document).ready(function(){
    
/*=== adjust scroll speed for parallax effect ===*/
    $(function(){
        $(window).scroll(function(){
          $('.box').each(function(){
            $(this).css('margin-top', - $(window).scrollTop() / parseInt($(this).attr('scrollSpeed')));
          });
        });
    })
    
    
    
/*==  accordian function for mobile version of pricing page  ==*/
    $(function () {
        $("#collapse li").children('ul').hide();
        $("#collapse li").on('click', function (event) {
            $(this).children('ul').stop().slideToggle(350);
            $(this).toggleClass("open");
            event.stopPropagation();
        });
    });

    $(function () {
        $("#collapse-faq li").children('ul').hide();
        $("#collapse-faq li").on('click', function (event) {
            $(this).children('ul').stop().slideToggle(350);
            $(this).toggleClass("open");
            event.stopPropagation();
        });
    });
    
/*  sorting the photos in the gallery  */

    $('a.sortLink').on('click',function(e){
         e.preventDefault();
         $('a.sortLink').removeClass('selected');
         $(this).addClass('selected');
         var keyword = $(this).attr('data-keyword');
         sortThumbnails(keyword);
    });
       
    $('.gallery .sorting').css('margin-bottom',window.thumbnailSpacing+'px');
    $('.thumbnail_container a.thumbnail').addClass('showMe');
    
    positionThumbnails();    
    
});



/*=================== accordian section on pricing page  ====================*/
$(function () {   
    $('.reveal').click(function() {
        $(this).children('ul').slideToggle();
    });
});



/* ========== displays what page you are currently on in the navbar  =============*/
$(function(){
  var windowHref = window.location.href;

  $('a').each(function() {
    var linkHref = $(this).prop('href');
    if (windowHref.indexOf(linkHref) === 0) {
      $(this).addClass('current');
    }
  });
});


/* ==========sorting the thumbnails in the portfolio gallery  ==============*/
function sortThumbnails(keyword){
    
    $('.thumbnail_container a.thumbnail').each(function(){
        var thumbnailKeywords = $(this).attr('data-keywords');
        
        if(keyword == 'all'){
            $(this).addClass('showMe').removeClass('hideMe');
        }else{
            
            if( thumbnailKeywords.indexOf(keyword) != -1){
                $(this).addClass('showMe').removeClass('hideMe');
            }else{
                $(this).addClass('hideMe').removeClass('showMe'); 
            }
            
        }
        
    });
    positionThumbnails();
}

function positionThumbnails(){
    
    /*debug*/ $('.debug-remainder').html('');
    
    $('.thumbnail_container a.thumbnail.hideMe').animate({opacity:0},500,function(){
        $(this).css({'display':'none','top':'0px','left':'0px'});
    });
    
    var containerWidth = $('.photos').width();
    var thumbnail_R = 0;
    var thumbnail_C = 0;
    var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailSpacing;
    var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailSpacing;
    var max_C = Math.floor(containerWidth / thumbnailWidth);
    
    $('.thumbnail_container a.thumbnail.showMe').each(function(index){
        var remainder = (index%max_C)/100;
        var maxIndex = 0;
        /* debug*/$('.debug-remainder').append(remainder+' - ');
        
        if(remainder == 0){
            if(index != 0){
                thumbnail_R += thumbnailHeight;    
            }
            thumbnail_C = 0;
        }else{
            thumbnail_C += thumbnailWidth;
        }
        
        $(this).css('display', 'block').animate({
            'opacity':1,
            'top':thumbnail_R+'px',
            'left':thumbnail_C+'px'
        }, 500);
        
        var newWidth = max_C * thumbnailWidth;
        var newHeight = thumbnail_R + thumbnailHeight;
        $('.thumbnail_container').css({'width':newWidth+'px','height':newHeight+'px'});
        
    });
    
    var sortingWidth = $('.thumbnail_container').width() / thumbnailWidth;
    var newWidth = sortingWidth * thumbnailWidth - window.thumbnailSpacing;
    $('.sorting').css('width', newWidth + 'px');
    
    
}

/*  adds validation to the contact form  */

   $('#loginForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'The name is required'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email is required'
                    }
                }
            }
        }
    });
   
   $('#myModal').on('shown.bs.modal', function() {
        $('#loginForm').bootstrapValidator('resetForm', true);
   });
 /*  
   document.getElementById("#aboutme").onclick = function() {
    this.style.height = 'auto';
}
*/
 
 
 
 
 









