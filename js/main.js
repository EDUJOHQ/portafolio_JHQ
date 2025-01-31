jQuery(document).ready(function($) {

    'use strict';


        $(".Modern-Slider").slick({
            autoplay:true,
            speed:1000,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            fade: true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
          });

        $('#nav-toggle').on('click', function (event) {
            event.preventDefault();
            $('#main-nav').toggleClass("open");
        });


        $('.tabgroup > div').hide();
            $('.tabgroup > div:first-of-type').show();
            $('.tabs a').click(function(e){
              e.preventDefault();
                var $this = $(this),
                tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
                others = $this.closest('li').siblings().children('a'),
                target = $this.attr('href');
            others.removeClass('active');
            $this.addClass('active');
            $(tabgroup).children('div').hide();
            $(target).show();
          
        })



        $(".box-video").click(function(){
          $('iframe',this)[0].src += "&amp;autoplay=1";
          $(this).addClass('open');
        });

        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:30,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:2,
                    nav:false
                },
                1000:{
                    items:3,
                    nav:true,
                    loop:false
                }
            }
        })



        var contentSection = $('.content-section, .main-banner');
        var navigation = $('nav');
        
        //when a nav link is clicked, smooth scroll to the section
        navigation.on('click', 'a', function(event){
            event.preventDefault(); //prevents previous event
            smoothScroll($(this.hash));
        });
        
        //update navigation on scroll...
        $(window).on('scroll', function(){
            updateNavigation();
        })
        //...and when the page starts
        updateNavigation();
        
        /////FUNCTIONS
        function updateNavigation(){
            contentSection.each(function(){
                var sectionName = $(this).attr('id');
                var navigationMatch = $('nav a[href="#' + sectionName + '"]');
                if( ($(this).offset().top - $(window).height()/2 < $(window).scrollTop()) &&
                      ($(this).offset().top + $(this).height() - $(window).height()/2 > $(window).scrollTop()))
                    {
                        navigationMatch.addClass('active-section');
                    }
                else {
                    navigationMatch.removeClass('active-section');
                }
            });
        }
        function smoothScroll(target){
            $('body,html').animate({
                scrollTop: target.offset().top
            }, 800);
        }


        $('.button a[href*=#]').on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top -0 }, 500, 'linear');
        });
});

document.addEventListener('DOMContentLoaded', function() {
    var options = {
      strings: ["¡Bienvenid@ a mi portafolio web! 🚀💻✨"],  // Texto a escribir
      typeSpeed: 55,    // Velocidad de escritura
      backSpeed: 40,     // Velocidad de borrado
      backDelay: 3000,   // Tiempo antes de borrar
      startDelay: 500,   // Tiempo antes de empezar a escribir
      loop: true,        // Hace que el texto se repita
      showCursor: true   // Mostrar el cursor
    };
  
    var typed = new Typed("#typed-output", options);  // Aplica el efecto de escritura sobre el 'p'
  });

async function sendMessage(){
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.getElementById('messages');

    if (!userInput.trim()) {
        return;
    }

    //Mostrar mensaje del usuario
    messagesDiv.innerHTML += `<div class="user-message">${userInput}</div>`;

    document.getElementById('user-input').value = "";

    try{
        const response = await fetch('https://localhost:3000/enviar-mensaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({mensaje: userInput}),
        });

        const data = await response.json();
        messagesDiv.scrollTop = messagesDiv.scrollHeight; //Auto-scroll
    } catch (error) {
        console.error("Error enviando mensaje:", error);
    }
}