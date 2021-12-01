let currIndex = 0;
let currLevel = 0;
let currText = '';
let testData = {
	testStarted: false,
	totalTime: 15,
	typed: 0,
	correct: 0,
	wrong: 0
};
let timerInterval;

const generateWords = async () => {
	const res = await fetch(`/data/getLanguageData?level=${currLevel}&amount=5`);
	return res.json();
}

const renderData = () => {

	const letters = currText.split('');
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
	if(currIndex >= currText.length) return;

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
	
	if(e.key === currText[currIndex]) {
		document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-1");
		testData.correct++;
	}
	else {
		document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-2");
		testData.wrong++;
		if((testData.wrong % 3) == 0) currLevel++;
	}
	
	document.getElementById(`ind-${currIndex}`).classList.remove("state-curr");
	if(currIndex < currText.length) {
		currIndex++;
		if(currIndex < currText.length) document.getElementById(`ind-${currIndex}`).classList.add("state-curr");
	}
	testData.typed++;

	if(currIndex === currText.length) {
		currIndex = 0;
		(async () => {
			let data = await generateWords();
			currText = await data.randWords.join(" ");
			renderData();
		})();
	}
	if(!testData.testStarted) startTimer();
}

const startTimer = () => {
	testData.testStarted = true;
	let timeLeft = testData.totalTime;
	timerInterval = setInterval(() => {
		if(timeLeft === 0) {
			clearInterval(timerInterval);
			currLevel = 0;
			currIndex = 0;
			const wpm = (testData.typed*2.8)*(testData.totalTime/60);
			const acc = (testData.typed/testData.correct)*100;
			document.getElementById("wpm").innerText = `${wpm}wpm`;
			document.getElementById("acc").innerHTML = `${acc}acc`;
			(async () => {
				let data = await generateWords();
				currText = await data.randWords.join(" ");
				renderData();
				// resetting test data
				testData = {
					testStarted: false,
					totalTime: 15,
					typed: 0,
					correct: 0,
					wrong: 0
				};
			})();
			return;
		}
		timeLeft--;
		document.getElementById("time-left").innerText = `${timeLeft}s`;
	}, 1000);
}

document.addEventListener("keydown", onKeyPress);
(async () => {
	let data = await generateWords();
	currText = await data.randWords.join(" ");
	renderData();
})();