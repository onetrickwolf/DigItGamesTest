var forPortrait = false;

function checkMobileEvent() {
	if ($.browser.mobile || isTablet) {
		$(window).off('orientationchange').on("orientationchange",
				function(event) {
					$('#canvasHolder').hide();
					$('#rotateHolder').hide();

					setTimeout(function() {
						checkMobileOrientation();
					}, 1000);
				});
		checkMobileOrientation();
	}
}

function checkMobileOrientation() {
	var o = window.orientation;
	var isLandscape = false;

	if (window.innerWidth > window.innerHeight) {
		isLandscape = true;
	}

	var display = false;
	if (!isLandscape) {
		if (forPortrait) {
			display = true;
		}
	} else {
		if (!forPortrait) {
			display = true;
		}
	}

	if (!display) {
		toggleRotate(true);
	} else {
		toggleRotate(false);
		$('#canvasHolder').show();
	}
}

function toggleRotate(con) {
	if (con) {
		$('#rotateHolder').fadeIn();
	} else {
		$('#rotateHolder').fadeOut();
	}
}