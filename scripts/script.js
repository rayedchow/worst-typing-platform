let currIndex = 0;
const text = 'hello test test amogus';

const renderData = () => {

	const letters = text.split('');
	const elementData = [`<span class="words state-0 state-curr" id="ind-0">${letters[0]}</span>`];

	for(let i = 1; i < letters.length; i++) {
		elementData.push(`<span class="words state-0" id="ind-${i}">${letters[i]}</span>`);
	}

	document.getElementById("words-parent").innerHTML = elementData.join("");
}

const onKeyPress = e => {
	const key = e.code;

	if(key !== 'Backspace' && key !== 'Space' && !key.includes("Key")) return;
	if(currIndex+1 > text.length) return;

	document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-1");
	document.getElementById(`ind-${currIndex}`).classList.remove("state-curr");
	currIndex++;
	document.getElementById(`ind-${currIndex}`).classList.add("state-curr");
}

document.addEventListener("keyup", onKeyPress);
renderData();