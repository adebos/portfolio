//scroll to section - прокрутка к секции
	$("a.scrollto").click(function () {
		elementClick = $(this).attr("href")
		destination = $(elementClick).offset().top + 16;
		$("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
		return false;
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

//bpopup
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


	// cache selectors
	let $loader = $('#loader'),
		$filters = $('#filters'),
		$photoBox = $('#photo-box'),
		$filePicker = $('#file-picker'),
		$label = $photoBox.find('.label'),
		$downloadLink = $('#download-link');

	let currentPreset = 'original',
		uploadedFileName = 'image';

	// create image
	let image = new Image();
	let maxWidth = $photoBox.width(),
		maxHeight = $photoBox.height(),
		imageWidth = maxWidth,
		imageHeight = maxHeight;

	image.onload = function() {
		let width = this.width,
			height = this.height;

		if (width >= maxWidth || height >= maxHeight) {
			if (width > height) {
				let ratio = width / maxWidth;
				imageWidth = maxWidth;
				imageHeight = height / ratio;
			} else {
				let ratio = height / maxHeight;
				imageHeight = maxHeight;
				imageWidth = width / ratio;
			}
		} else {
			imageWidth = width;
			imageHeight = height;
		}

		$label.hide();

		$filters.addClass('active');
		$filters.find('.preset')
			.first()
			.trigger('click');

		let $oldCanvas = $photoBox.find('canvas');

		let $photo = $('<canvas>').addClass('photo').attr({
			id: 'photo',
			width: imageWidth,
			height: imageHeight
		}).css({
			width: $oldCanvas.width() || '0px',
			heigth: $oldCanvas.height() || '0px'
		});

		$oldCanvas.remove();
		$photoBox.append($photo);

		let ctx = $photo[0].getContext('2d');
		ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

		$photo.css({
			width: imageWidth + 'px',
			height: imageHeight + 'px'
		});

		$loader.hide();
	}

	function uploadFile(file) {

		if (file.type.match('image/jpeg') || file.type.match('image/png')) {
			$loader.show();
			image.src = URL.createObjectURL(file);
			uploadedFileName = file.name.split('.').shift();
		} else {
			alert('Поддерживаются только файлы jpg и png');
		}
	}
	$photoBox
	.on('dragenter', event => {
		$(event.target).addClass('dragenter over');
		event.preventDefault();
	})
	.on('dragleave', event => {
		$(event.target).removeClass('dragenter over');
		event.preventDefault();
	})
	.on('dragover', event => {
	    event.preventDefault();
	})
	.on('drop', event => {
		$(event.target).removeClass('dragenter over');

		if (event.originalEvent.dataTransfer.files.length) {
			uploadFile(event.originalEvent.dataTransfer.files[0]);
		}
		event.preventDefault();
	})
	.on('click', event => {
		$filePicker.trigger('click');
	});

	$filePicker.on('change', event => {
		if (event.target.files.length) {
			uploadFile(event.target.files[0]);
		}
	});

	$filters.on('click', '.preset', event => {
		let $this = $(event.target),
			preset = $this.data('preset');

	    $(".preset").removeClass('active');
	    $this.addClass('active');

	    Caman('#photo', function() {
	    	this.reset();

	    	$downloadLink.removeClass('show');
	    	currentPreset = preset;

	    	if (preset !== 'original') {
	    		this[preset]();
	    		this.render();
	    		$downloadLink.addClass('show');
	    	}
	    });

	    event.preventDefault();
	});

	Caman.Event.listen("processStart", function(job) {
		$loader.show();
	});

	Caman.Event.listen("renderFinished", function() {
		$loader.hide();
	});


	$downloadLink.on('click', event => {
		let link = event.target,
			canvas = document.getElementById('photo');

		link.href = canvas.toDataURL();
		link.download = `${uploadedFileName}-${currentPreset}.png`;
	});
	var flagInit = false;
	window.onresize = function(){
		if (document.body.clientWidth >= 851) {
			$(".owl-carousel").removeClass('owl-carousel-filtr');
		} else {
			$(".owl-carousel").addClass('owl-carousel-filtr');
			if (!flagInit) {
				$(".owl-carousel-filtr").owlCarousel({
					loop: false,
					nav: true,
					dots: false,
					navText : ['<i class="icon icon-arr_l"></i>', '<i class="icon icon-arr_r"></i>'],
					autoplay: false,
					responsive:{
						0:{items: 2},
						420:{items: 3},
						600:{items: 5},
						761:{items: 7}
					}
				});
				flagInit = true;
			}
		}
	};
	//owl
