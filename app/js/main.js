//rezume open section after click
	$('#rezume').click(function(){
		$(this).addClass('active');
	})

// //owlCarousel developed
	$(".owl-carousel").owlCarousel({
	  	items: 3,
		loop: true,
		nav: true,
		navText : ['<i class="icon icon-arr_l"></i>', '<i class="icon icon-arr_r"></i>'],
		autoplay: true,
		dots: false,
		responsive:{
			0:{items: 1},
			480:{items: 2},
			760:{items: 3}
		}
	});

//scroll to section - прокрутка к секции
	$("a.scrollto").click(function () {
		elementClick = $(this).attr("href")
		destination = $(elementClick).offset().top + 16;
		$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
		return false;
	});

// Typed Js - сменяющийся заголовок
	var typed = new Typed(".animation", {
		strings: ["Ищите разработчика?", "Нужна хорошая поддержка?", "Нужен крутой сайт?"],
    // strings: ["У Вас есть идея?", "У Вас есть проект?", "Нужен подобный сайт?"],
		typeSpeed: 70,
		backSpeed: 30,
		backDelay: 2000,
		loop: true,
		loopCount: false,
	});

//запретить вызов контекстного меню
	document.body.oncontextmenu = function (e) {
		return false;
	};

//защита от копирования
	function addLink() {
		var body_element = document.getElementsByTagName('body')[0];
		var selection = window.getSelection();
		var pagelink = '<p>Источник: <a href="' + document.location.href + '">' + document.location.href + '</a></p>';
		var copytext = selection + pagelink;
		var newdiv = document.createElement('div');
		newdiv.style.position = 'absolute';
		newdiv.style.left = '-99999px';
		body_element.appendChild(newdiv);
		newdiv.innerHTML = copytext;
		selection.selectAllChildren(newdiv);
		window.setTimeout( function() {
			body_element.removeChild(newdiv);
		}, 0);
	}
	document.oncopy = addLink;

//скрыть fixed вверху страницы
	function hideBlock() {
		var block = $('.fixed');
		if($('body').scrollTop() >= 300) {
			block.fadeIn();
		}
		else {
			block.fadeOut();
		}
	};
	$(window).scroll(hideBlock);

//часы
	function dysTime() {
    var e, t, o, n = new Date, a = n.getSeconds(), i = n.getMinutes(), s = n.getHours(), r = 6 * a, l = 6 * i, d = .5 * i;
    h = s > 12 ? 30 * (s - 12) : 30 * s,
    e = document.getElementById("second"),
    e.style.webkitTransform = "rotate(" + r + "deg)",
    e.style.MozTransform = "rotate(" + r + "deg)",
    e.style.OTransform = "rotate(" + r + "deg)",
    e.style.msTransform = "rotate(" + r + "deg)",
    t = document.getElementById("minute"),
    t.style.webkitTransform = "rotate(" + l + "deg)",
    t.style.MozTransform = "rotate(" + l + "deg)",
    t.style.OTransform = "rotate(" + l + "deg)",
    t.style.msTransform = "rotate(" + l + "deg)",
    o = document.getElementById("hour"),
    o.style.webkitTransform = "rotate(" + (h + d) + "deg)",
    o.style.MozTransform = "rotate(" + (h + d) + "deg)",
    o.style.OTransform = "rotate(" + (h + d) + "deg)",
    o.style.msTransform = "rotate(" + (h + d) + "deg)",
    setTimeout(dysTime, 1e3)
}
	dysTime();

//переключатель день-ночь
    $(".switch").on("click", function(n) {
        $(".header").toggleClass("night");
    });

//проверка времени суток для нального отображения day/night
	var startDate = new Date,
        startHour = startDate.getHours();
    if (startHour >= 21 || startHour <= 7) {$(".header").addClass("night");}


//параллакс
	$(document).on("mousemove", function(n) {
        $(".sun").css({
            left: n.pageX / 30 + 20,
            top: -n.pageY / 35 + 10
        })
    });
    $(document).on("mousemove", function(n) {
        var pos = -n.pageX / 35 + 10;
        $(".window").css("background-position-x", + pos + "px")
    });

//bpopup

    console.log(111);
	$('.jsAppPopup').click(function(e) {
		e.preventDefault();
		$('.jsPopup').bPopup();
	});

//отправка почты
	$(".js-form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail/mail.php",
			data: th.serialize()
		}).done(function() {
			th.hide();
			$(".success").show();
			setTimeout(function() {
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

// options particles.js - настройки
setTimeout(function(){
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 110,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5997616736507331,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 225.76023976023976,
          "line_linked": {
            "opacity": 0.8336705787130719
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
);
}, 1000);