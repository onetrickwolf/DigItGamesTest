var stage
var canvasW = 0;
var canvasH = 0;

function initGameCanvas(w, h) {
	canvasW = w;
	canvasH = h;
	stage = new createjs.Stage("gameCanvas");

	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}

var canvasContainer, mainContainer, gameContainer, resultContainer;
var bg, logo, startButton, replayButton;

function buildGameCanvas() {
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();

	bg = new createjs.Shape();
	bg.graphics.beginFill("#0CB0FF").drawRect(0, 0, canvasW, canvasH);

	logo = new createjs.Bitmap(loader.getResult('logo'));
	centerReg(logo);
	logo.x = 200;
	logo.y = canvasH - 70;

	for (n = 0; n < 6; n++) {
		graphicBox_array[n] = new createjs.Shape();
		graphicBox_array[n].graphics.beginFill("#77D3FF").drawRoundRect(
				canvasW / 8 * n + (canvasW / 6) - 20,
				(canvasH / 100 * 50) - 50, 80, 100, 10);
		gameContainer.addChild(graphicBox_array[n]);
	}

	for (n = 0; n < 6; n++) {
		answerBox_array[n] = new createjs.Text();
		answerBox_array[n].name = "boop";
		answerBox_array[n].font = "80px arial";
		answerBox_array[n].color = "#ffffff";
		answerBox_array[n].text = "";
		answerBox_array[n].textAlign = "center";
		answerBox_array[n].textBaseline = 'alphabetic';
		answerBox_array[n].x = canvasW / 8 * n + (canvasW / 6) + 20;
		answerBox_array[n].y = (canvasH / 100 * 53.5);

		gameContainer.addChild(answerBox_array[n]);
	}

	for (n = 0; n < 10; n++) {
		num_array[n] = new createjs.Text();
		num_array[n].font = "120px arial";
		num_array[n].color = "#ffffff";
		num_array[n].text = n;
		num_array[n].textAlign = "center";
		num_array[n].textBaseline = 'alphabetic';
		num_array[n].x = canvasW / 11 * n + (canvasW / 11);
		num_array[n].y = (canvasH / 100 * 80);

		var hit = new createjs.Shape();
		hit.graphics.beginFill("#000").drawRect(
				-num_array[n].getMeasuredWidth() / 2,
				-num_array[n].getMeasuredHeight(),
				num_array[n].getMeasuredWidth(),
				num_array[n].getMeasuredHeight());
		num_array[n].hitArea = hit;

		buildDragAndDrop(num_array[n]);

		gameContainer.addChild(num_array[n]);
	}

	equationText = new createjs.Text();
	equationText.font = "70px arial";
	equationText.color = "#ffffff";
	equationText.text = "";
	equationText.textAlign = "center";
	equationText.textBaseline = 'alphabetic';
	equationText.x = canvasW / 2;
	equationText.y = (canvasH / 100 * 20);
	gameContainer.addChild(equationText);

	resultText = new createjs.Text();
	resultText.font = "70px arial";
	resultText.color = "#ffffff";
	resultText.text = "";
	resultText.textAlign = "center";
	resultText.textBaseline = 'alphabetic';
	resultText.x = canvasW / 2;
	resultText.y = (canvasH / 100 * 40);
	gameContainer.addChild(resultText);

	allResultsDisplay = new createjs.Text();
	allResultsDisplay.font = "40px arial";
	allResultsDisplay.color = "#ffffff";
	allResultsDisplay.text = "";
	allResultsDisplay.textAlign = "center";
	allResultsDisplay.textBaseline = 'alphabetic';
	allResultsDisplay.x = canvasW / 2;
	allResultsDisplay.y = (canvasH / 100 * 12);

	startButton = new createjs.Text();
	startButton.font = "30px arial";
	startButton.color = "#ffffff";
	startButton.text = "Click Anywhere To Play";
	startButton.textAlign = "center";
	startButton.textBaseline = 'alphabetic';
	startButton.x = canvasW / 2;
	startButton.y = (canvasH / 100 * 60);

	title = new createjs.Text();
	title.font = "70px arial";
	title.color = "#ffffff";
	title.text = "Super Math Extreme!";
	title.textAlign = "center";
	title.textBaseline = 'alphabetic';
	title.x = canvasW / 2;
	title.y = (canvasH / 100 * 40);

	replayButton = new createjs.Text();
	replayButton.font = "50px arial";
	replayButton.color = "#ffffff";
	replayButton.text = "New Game";
	replayButton.textAlign = "center";
	replayButton.textBaseline = 'alphabetic';
	replayButton.x = canvasW / 2;
	replayButton.y = (canvasH / 100 * 58);
	replayButton.hitArea = new createjs.Shape(new createjs.Graphics()
			.beginFill("#000").drawRect(-200, -30, 400, 40));

	mainMenuButton = new createjs.Text();
	mainMenuButton.font = "50px arial";
	mainMenuButton.color = "#ffffff";
	mainMenuButton.text = "Main Menu";
	mainMenuButton.textAlign = "center";
	mainMenuButton.textBaseline = 'alphabetic';
	mainMenuButton.x = canvasW / 2;
	mainMenuButton.y = (canvasH / 100 * 80);
	mainMenuButton.hitArea = new createjs.Shape(new createjs.Graphics()
			.beginFill("#000").drawRect(-200, -30, 400, 40));

	mainContainer.addChild(startButton, logo, title);
	resultContainer.addChild(replayButton, mainMenuButton, allResultsDisplay);
	canvasContainer.addChild(bg, mainContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);

	resizeCanvas();
}

function resizeCanvas() {
	if (canvasContainer != undefined) {
		canvasContainer.scaleX = canvasContainer.scaleY = scalePercent;
	}
}

function removeGameCanvas() {
	stage.autoClear = true;
	stage.removeAllChildren();
	stage.update();
	createjs.Ticker.removeEventListener("tick", tick);
	createjs.Ticker.removeEventListener("tick", stage);
}

function tick(event) {
	stage.update(event);
}

function centerReg(obj) {
	obj.regX = obj.image.naturalWidth / 2;
	obj.regY = obj.image.naturalHeight / 2;
}