var click = false,
site_url = '';
$(window).load(function() {
    if ($(window).innerWidth() > 1023) {                
        $.stellar({
            horizontalScrolling: false,
            hideDistantElements: false,
            responsive: true
        });  
        $(window).resize(function() {
            $.stellar('refresh');
        });
    }    
});
(function($, window, document) {
    'use strict';
    
    $(function(){
        
        setInterval(function() {
            changeBanner_sobre('next');
        }, 3000);

        var myTimer =  setInterval(function() {
            changeSlider('next');
        }, 7000);

      
        
        if ($('#latitude').val() && $('#longitude').val()) {
            show_map({
                lati: $('#latitude').val(),
                longi: $('#longitude').val()
            }, true);
        }  


        var mySwiper = new Swiper ('#sobre .slider .swiper-container', {
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
     
        });      

        var mySwiper2 = new Swiper ('#pistas .slider .swiper-container', {
            loop: false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
     
        });      

        $('#laboratorio .content_estrutura ul').masonry({
            itemSelector: '#laboratorio .content_estrutura ul li',
            columnWidth: '#laboratorio .content_estrutura ul li',
            originLeft:true,
            percentPosition: true
        });  

        $(".mobile").click(function(){  
            $(this).toggleClass('active');
            $('header .menu .last').toggleClass('active');
            
        });


        $(".button, .menu ul li a").click(function(){  
            click = true;   
            $('.menu ul li a').removeClass("active");
            var name = $(this).attr("data-row-id");
            var c = $("[data-row-id="+name+"]");
            c.addClass("active");
           
            var id = "#" + name;
            var top = $(id).first().offset().top - 90;           
            $('html, body').animate({scrollTop: top+'px'}, 600);
            
        });
        
        $( "#pistas .menu ul li a" ).hover(
          function() {
            var name = ".content_header ."+$(this).attr("data-row-id");
            $( name ).addClass( "hover" );
          }, function() {
            var name = ".content_header ."+$(this).attr("data-row-id");
            $( name ).removeClass( "hover" );
          }
        );

        var sectionIds = {};        

        $(".row").each(function(){  
            var $this = $(this);            
            sectionIds[$this.attr("id")] = $this.first().offset().top -90; 
        });         
        

        $(window).scroll(function(event){     
             var navHeight = $( '#pistas .content_header' ).outerHeight() + $( 'header' ).outerHeight();
            if ($(window).scrollTop() > navHeight) {
             $('#pistas .menu').addClass('fixed');
            }
            else {
             $('#pistas .menu').removeClass('fixed');
            }  

            if(!click){
                
                    var scrolled = $(this).scrollTop();    
                    $.each(sectionIds, function(key, value) {
                        if (scrolled >= sectionIds[key]){
                           $("#pistas .menu ul li a").removeClass("active");
                            var c = $("[data-row-id="+key+"]");
                            c.addClass("active");
                                      
                        }
                    });
                    click = false;
                
            }else{
                clearTimeout($.data(this, 'scrollTimer'));
                $.data(this, 'scrollTimer', setTimeout(function() {
                    click = false;
                }, 250));
            }
         
        
        });

        $(".animsition").animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1500,
            outDuration: 1500,
            linkElement: '.animsition-link',
            // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
            loading: true,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            loadingInner: '', // e.g '<img src="loading.svg" />'
            timeout: false,
            timeoutCountdown: 5000,
            onLoadEvent: true,
            browser: [ 'animation-duration', '-webkit-animation-duration'],
            // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
            // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
            overlay : false,
            overlayClass : 'animsition-overlay-slide',
            overlayParentElement : 'body',
            transition: function(url){ window.location.href = url; }
        });

    });


}(window.jQuery, window, document));

function show_map(coords, useMarker) {
    var latlng = new google.maps.LatLng(coords.lati, coords.longi);
    var options = {
        zoom: 16,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP, // This value can be set to define the map type ROADMAP/SATELLITE/HYBRID/TERRAIN
        navigationControl: true,
        mapTypeControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#193341"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2c5a71"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#29768a"
                            },
                            {
                                "lightness": -37
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#406d80"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#406d80"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#3e606f"
                            },
                            {
                                "weight": 2
                            },
                            {
                                "gamma": 0.84
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "weight": 0.6
                            },
                            {
                                "color": "#1a3541"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2c5a71"
                            }
                        ]
                    }
                ]
    };
    map = new google.maps.Map(document.getElementById('map_div'), options);
    // else map.setCenter(latlng);
    if (useMarker) {
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: site_url + '/_assets/images/pin.png'
        });
    }
};


function changeBanner_sobre(id) {
    var cnt_banners = $('.content_pistas .slider li').length;
    var current_banner = $('.content_pistas .slider li.active');
    var show = current_banner.index() + 1;
    if (show >= cnt_banners) {
        show = 0
        var move = 0;
        $(".content_pistas .slider li").animate({
            left: "0px"
        }, 500);
    } else {
        var move = $('.content_pistas .slider li').outerWidth();
        $(".content_pistas .slider li").animate({
            left: "-=" + move + "px"
        }, 500);
    };
    $('.content_pistas .slider li').each(function(i) {
        $(this).removeClass('next prev active');
        if (i < show) $(this).addClass('prev');
        else if (i > show) $(this).addClass('next');
        else if (i == show) $(this).addClass('active');
    });
    return;
};

function changeSlider(id){
    var cnt_banners = $('.list_banners li').length;
    var current_banner = $('.list_banners li.active');

    if(id == 'prev'){
        var show = current_banner.index() - 1;
        if(show < 0){
            clearInterval(myTimer);
            myTimer =  setInterval(function() {
                changeSlider('next');
            }, 7000);
            show = cnt_banners-1
        };
    }else if(id == 'next'){
        var show = current_banner.index() + 1;
        if(show >= cnt_banners){show = 0};
    }else{
        var show = id;
    }

     $('.list_banners li').each(function(i){
            $(this).removeClass('next prev active');
            if(i < show)
                $(this).addClass('prev');
            else if(i > show)
                $(this).addClass('next');
            else if(i == show)
                $(this).addClass('active');
        });

    $('#home .bullets li').removeClass('active');
    $('#home .bullets li:eq('+show+')').addClass('active');     
};
