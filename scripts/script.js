let currIndex = 0;
const text = 'hello test test amogus';
const testData = {
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
}

const onKeyPress = e => {
	const code = e.code;

	if(code !== 'Backspace' && code !== 'Space' && !code.includes("Key")) return;
	if(currIndex >= text.length) return;

	const currElem = document.getElementById(`ind-${currIndex}`);

	if(code === 'Backspace' && currIndex > 0) {
		console.log('hello');
		currElem.classList.remove("state-curr");
		currIndex--;
		testData.typed--;
		currElem.classList.add("state-curr");
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
	if(currIndex+1 < text.length) {
		currIndex++;
		document.getElementById(`ind-${currIndex}`).classList.add("state-curr");
	}
	testData.typed++;
}

document.addEventListener("keyup", onKeyPress);
renderData();