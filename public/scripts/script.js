let currIndex = 0;
const text = 'hello test test amogus';
const testData = {
	testStarted: false,
	totalTime: 10,
	total: text.length,
	typed: 0,
	correct: 0,
	wrong: 0
};

const renderData = () => {

	const letters = text.split('');
	const elementData = [`<span class="words state-0 state-curr" id="ind-0">${letters[0]}</span>`];

	for(let i = 1; i < letters.length; i++) {
		elementData.push(`<span class="words state-0" id="ind-${i}">${letters[i]}</span>`);
	}

	document.getElementById("words-parent").innerHTML = elementData.join("");
	document.getElementById("time-left").innerText = `${testData.totalTime}s`;
}

const onKeyPress = e => {
	const code = e.code;

	if(code !== 'Backspace' && code !== 'Space' && !code.includes("Key")) return;
	if(currIndex >= text.length) return;

	let currElem = document.getElementById(`ind-${currIndex}`);

	if(code === 'Backspace') {
		if(currIndex<=0) return;

		currElem.classList.remove("state-curr");
		currIndex--;
		currElem = document.getElementById(`ind-${currIndex}`);
		testData.typed--;
		document.getElementById(`ind-${currIndex}`).classList.add("state-curr");

		if(currElem.classList.contains("state-1")) {
			currElem.classList.replace("state-1", "state-0");
			testData.correct--;
		} else {
			currElem.classList.replace("state-2", "state-0");
			testData.wrong--;
		}
		
		return;
	}
	
	if(e.key === text[currIndex]) {
		document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-1");
		testData.correct++;
	}
	else {
		document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-2");
		testData.wrong++;
	}
	
	document.getElementById(`ind-${currIndex}`).classList.remove("state-curr");
	if(currIndex < text.length) {
		currIndex++;
		if(currIndex < text.length) document.getElementById(`ind-${currIndex}`).classList.add("state-curr");
	}
	testData.typed++;
	if(!testData.testStarted) startTimer();
}

const startTimer = () => {
	testData.testStarted = true;
	let timeLeft = testData.totalTime;
	const timerInterval = setInterval(() => {
		if(timeLeft === 0) {
			clearInterval(timerInterval);
			console.log(testData);
			return;
		}
		timeLeft--;
		document.getElementById("time-left").innerText = `${timeLeft}s`;
	}, 1000);
}

document.addEventListener("keydown", onKeyPress);
renderData();