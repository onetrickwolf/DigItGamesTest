var stageWidth, stageHeight = 0;
var isLoaded = false;

$(function() {
	$(window).resize(function() {
		resizeLoaderFunc();
	});
	resizeLoaderFunc();
	checkBrowser();
});

function resizeLoaderFunc() {
	stageWidth = $(window).width();
	stageHeight = $(window).height();

	$('#mainLoader').css('left', checkContentWidth($('#mainLoader')));
	$('#mainLoader').css('top', checkContentHeight($('#mainLoader')));
}

var browserSupport = false;
var isTablet;
function checkBrowser() {
	isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i
			.test(navigator.userAgent.toLowerCase()));
	deviceVer = getDeviceVer();

	var canvasEl = document.createElement('canvas');
	if (canvasEl.getContext) {
		browserSupport = true;
	}

	if (browserSupport) {
		if (!isLoaded) {
			isLoaded = true;
			initPreload();
		}
	} else {
		$('#notSupportHolder').show();
	}
}