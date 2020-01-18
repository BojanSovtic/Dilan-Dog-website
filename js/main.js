(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('.js-gtco-nav-toggle').addClass('gtco-nav-dark');

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};

	
	var offcanvasMenu = function() {

		$('#page').prepend('<div id="gtco-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-dark"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 200, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var parallax = function() {

		if ( !isMobile.any() ) {
			$(window).stellar({
				horizontalScrolling: false,
				hideDistantElements: false, 
				responsive: true
			});
		}
	};

	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	};
	
	var showMore = (function() {
	var showChar = 300;
	var ellipsestext = "...";
	var moretext = "Pročitaj još";
	var lesstext = "Smanji";
	$('.more').each(function() {
		var content = $(this).html();

		if(content.length > showChar) {

			var c = content.substr(0, showChar);
			var h = content.substr(showChar, content.length - showChar);

			var html = c + '<span class="moreelipses">'+ellipsestext+'</span><span class="morecontent"><span>'+ h + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button href="" class="morelink">'+moretext+'</button></span>';

			$(this).html(html);
		}

	});

	$(".morelink").click(function(){
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
			}
			$(this).parent().prev().toggle();
			$(this).prev().toggle();
			return false;
		});
	});
	
	var modalImage = (function () {
        $('#myModal').on('show.bs.modal', function (e) {
            var image = $(e.relatedTarget).attr('src');
            $(".img-responsive-modal").attr("src", image);
        });
	});
	
	var charCounter = function() {
		if($('body').is('.form-page')){
		var message = document.getElementById('message');
		var messageCount = document.getElementById('message-count');
		
		message.addEventListener('focus', updateCounter);
		message.addEventListener('input', updateCounter);
		
		message.addEventListener('blur', function () {
			if (message.value.length <= 140) {
				messageCount.className = 'hide';
			}
		});
		
		function updateCounter(e) {
			var target = e.target || e.srcElement;
			var count = 140 - target.value.length;
			if (count < 0) {
				messageCount.className = 'error';
			} else if (count <= 15) {
				messageCount.className = 'warn';
			} else {
				messageCount.className = 'good';
			}
			var charMsg = count + ' karaktera';
			messageCount.textContent = charMsg;
		}
	}
	};
	
	$(function(){
		charCounter();
		modalImage();
		showMore();
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		parallax();
		stickyBanner();
	});


}());

	function validateForm() {
		if($('body').is('.form-page')){
			
		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var subject = document.getElementById('subject').value;
		var message = document.getElementById('message').value;
						
		var greske = new Array();
		var podaci = {};
		
		var regName = /^[A-Z][a-z\s]{1,13}$/;
		var regEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		var regSubject = /^[A-Za-z0-9._+-\s]{1,30}$/;
		var regMessage = /^[A-Za-z0-9._+-\s]{1,140}$/;
		
		if(!name.match(regName)){
			$('#name-span').css('display', 'block');
			greske.push('Nije uneto ispravno ime');
		} else {
			$('#name-span').css('display', 'none');
			podaci.ime = name;
		}
		
		if(!email.match(regEmail)){
			$('#email-span').css('display', 'block');
			greske.push('Nije unet ispravan email');
		} else {
			$('#email-span').css('display', 'none');
			podaci.email = email;
		}
		
		if(!subject.match(regSubject)){
			$('#subject-span').css('display', 'block');
			greske.push('Nije unet ispravan naslov');
		} else {
			$('#subject-span').css('display', 'none');
			podaci.subject = subject;
		}
		
		if(!message.match(regMessage)){
			$('#message-span').css('display', 'block');
			greske.push('Nije uneta ispravna poruka');
		} else {
			$('#message-span').css('display', 'none');
			podaci.poruka = message;
		}
		
		jsonArr = JSON.stringify(podaci);
		
		alert(greske);
		
		if(greske.length == 0) {
			$.ajax({
				
				type: "POST",
				url: "test.php",
				dataType: "JSON",
				data: jsonArr,
				success: function(jsonArr) {
					console.log(jsonArr);
				},
				error: function() {
					console.log('Error: ' + jsonArr);
				}
			});
		}
	}};
	