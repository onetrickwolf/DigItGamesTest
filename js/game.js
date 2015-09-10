var num_array = [];
var answerBox_array = [];
var graphicBox_array = [];
var equationText;
var resultText;

var allResults = "";

var questionNum = 0;

var num1;
var num2;
var solution;

function buildReplayButton() {
	replayButton.cursor = "pointer";
	replayButton.addEventListener("mousedown", function(evt) {
		resultContainer.visible = false;
		goPage('game');
	});
}

function buildMainMenuButton() {
	mainMenuButton.cursor = "pointer";
	mainMenuButton.addEventListener("mousedown", function(evt) {
		resultContainer.visible = false;
		goPage('main');
	});
}

function setupGameButton() {
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerMethod);
}

function removeGameButton() {
	stage.cursor = null;
	stage.removeEventListener("click", handlerMethod);
}

function handlerMethod(evt) {
	switch (evt.type) {
	case 'click':
		goPage('game');
		break;
	}
}

var curPage = ''
function goPage(page) {
	curPage = page;

	mainContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;

	resultText.alpha = 0;

	removeGameButton();
	stopAnimateButton(startButton);

	var targetContainer = ''
	switch (page) {
	case 'main':
		targetContainer = mainContainer;
		setupGameButton();
		animateButton(startButton);
		break;
	case 'game':
		targetContainer = gameContainer;
		startGame();
		break;
	case 'result':
		targetContainer = resultContainer;
		replayButton.alpha = 1;
		break;
	}

	targetContainer.alpha = 0;
	targetContainer.visible = true;

	$(targetContainer).clearQueue().stop(true, true).animate({
		alpha : 1
	}, 500);
}

function stopAnimateButton(obj) {
	obj.alpha = 0;
	$(obj).clearQueue().stop(true, true);
}

function animateButton(obj) {
	obj.alpha = 0;
	$(obj).animate({
		alpha : 1
	}, 500).animate({
		alpha : 0
	}, 500, function() {
		animateButton(obj);
	});
}

function startGame() {
	generateProblem();
}

function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
	if (questionNum < 5) {
		for (n = 0; n < 6; n++) {
			answerBox_array[n].text = ""
		}

		for (n = 0; n < 6; n++) {
			graphicBox_array[n].alpha = 0.3;
			answerBox_array[n].alpha = 0.3;
		}

		num1 = getRandomIntInclusive(10, 99999);
		num2 = getRandomIntInclusive(10, 99999);

		allResults += "\n" + num1 + " + " + num2;

		if (equationText.text.indexOf("\n") > 0) {
			equationText.textAlign = "center";
			equationText.text = num1 + " + " + num2;
			equationText.x = canvasW / 2;
		} else {
			equationText.textAlign = "end";
			equationText.text = num1 + "\n+" + num2;
			equationText.x += equationText.getMeasuredWidth() / 4;
		}

		solution = num1 + num2;

		for (n = 0, i = 5; n < solution.toString().length; n++, i--) {

			graphicBox_array[i].alpha = 1;
			answerBox_array[i].alpha = 1;
		}

		questionNum++
	} else {
		questionNum = 0;
		allResultsDisplay.text = allResults;
		allResults = "";
		goPage("result");
	}

}

function checkBoxes() {
	for (n = 0, i = 5; n < solution.toString().length; n++, i--) {
		if (answerBox_array[i].text === "") {
			return false;
		}
	}
	return true;
}

function checkAnswer() {
	var answer = "";
	for (n = 0, i = 5; n < solution.toString().length; n++, i--) {
		answer = answerBox_array[i].text + answer.toString();
	}
	if (parseInt(answer) == solution) {
		resultText.text = "Correct!";
		allResults += " = " + answer + " Correct! ";
		$(resultText).animate({
			alpha : 1
		}, 500, "swing");

		$(resultText).animate({
			alpha : 1
		}, 500);

		$(resultText).animate({
			alpha : 0
		}, 500, "swing", function() {
			generateProblem()
		});
	} else {
		resultText.text = "Incorrect :(";
		allResults += " = " + answer + " Incorrect (Answer: " + solution + ")";
		$(resultText).animate({
			alpha : 1
		}, 500, "linear");

		$(resultText).animate({
			alpha : 1
		}, 500);

		$(resultText).animate({
			alpha : 0
		}, 500, "swing", function() {
			generateProblem()
		});
	}
}

var touchCon = true;
function buildDragAndDrop(obj) {
	obj.cursor = "pointer";
	obj.addEventListener("mousedown", function(evt) {
		toggleDragEvent(evt, 'drag', touchCon)
	});
	obj.addEventListener("pressmove", function(evt) {
		toggleDragEvent(evt, 'move', touchCon)
	});
	obj.addEventListener("pressup", function(evt) {
		toggleDragEvent(evt, 'release', touchCon)
	});
}

var origX = 0;
var origY = 0;

function toggleDragEvent(obj, con, _touchCon) {

	if (_touchCon) {
		switch (con) {
		case 'drag':
			origX = obj.target.x;
			origY = obj.target.y;

			cursorX = obj.stageX / scalePercent;
			obj.target.offset = {
				x : obj.target.x - (obj.stageX / scalePercent),
				y : obj.target.y - (obj.stageY / scalePercent)
			};

			break;

		case 'move':
			obj.target.x = (obj.stageX / scalePercent) + obj.target.offset.x;
			obj.target.y = (obj.stageY / scalePercent) + obj.target.offset.y;

			cursorX = obj.stageX / scalePercent;
			break;

		case 'release':
			var hit = false;
			for (n = 0, i = 5; n < solution.toString().length; n++, i--) {
				var pt = graphicBox_array[i].globalToLocal(stage.mouseX,
						stage.mouseY);
				if (graphicBox_array[i].hitTest(pt.x, pt.y)) {
					hit = true;
					answerBox_array[i].text = obj.target.text;

					$(obj.target).animate({
						alpha : 0
					}, 0, "swing");

					$(obj.target).animate({
						alpha : 1
					}, 500);

					obj.target.x = origX;
					obj.target.y = origY;
				}
			}

			if (!hit) {
				$(obj.target).animate({
					x : origX,
					y : origY
				}, 500, "swing");
			} else {
				if (checkBoxes()) {
					checkAnswer();
				}
			}

			break;
		}
	}
}