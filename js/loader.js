function initPreload() {
	toggleLoader(true);

	checkMobileEvent();

	$(window).resize(function() {
		resizeGameFunc();
	});
	resizeGameFunc();

	loader = new createjs.LoadQueue(false);
	manifest = [ {
		src : 'assets/logo.png',
		id : 'logo'
	} ];

	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error", handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

function fileComplete(evt) {
	var item = evt.item;
	console.log("Event Callback file loaded ", evt.item.id);
}

function handleFileError(evt) {
	console.log("error ", evt);
}

function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress / 1 * 100));
}

function handleComplete() {
	toggleLoader(false);
	initMain();
};

function toggleLoader(con) {
	if (con) {
		$('#mainLoader').show();
	} else {
		$('#mainLoader').hide();
	}
}