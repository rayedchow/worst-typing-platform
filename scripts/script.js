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
	const code = e.code;

	if(code !== 'Backspace' && code !== 'Space' && !code.includes("Key")) return;
	if(currIndex >= text.length) return;

	if(code === 'Backspace' && currIndex > 0) {
		console.log('hello');
		document.getElementById(`ind-${currIndex}`).classList.remove("state-curr");
		currIndex--;
		document.getElementById(`ind-${currIndex}`).classList.add("state-curr");
		document.getElementById(`ind-${currIndex}`).classList.replace("state-1", "state-0");
		document.getElementById(`ind-${currIndex}`).classList.replace("state-2", "state-0");
		return;
	}
	
	if(e.key === text[currIndex])
		document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-1");
	else
		document.getElementById(`ind-${currIndex}`).classList.replace("state-0", "state-2");
	
	document.getElementById(`ind-${currIndex}`).classList.remove("state-curr");
	if(currIndex+1 < text.length) {
		currIndex++;
		document.getElementById(`ind-${currIndex}`).classList.add("state-curr");
	}
}

document.addEventListener("keyup", onKeyPress);
renderData();