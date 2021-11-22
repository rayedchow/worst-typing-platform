let currIndex = 0;

const getDefaultTextData = (text) => {
	const letters = text.split('');
	const data = [];
	for(let i = 0; i < letters.length; i++) {
		data.push({
			index: i,
			state: 0,
			letter: letters[i]
		});
	}

	// console.log(data);
	return data;
}

const textData = getDefaultTextData('hello amogus susy');

const renderData = () => {

	console.log(textData);
	const elementData = [];

	for(const data of textData) {
		// if(currIndex == data.index) {
		// 	elementData.push('<span id="caret"></span>');
		// }
		elementData.push(`<span class="words state-${data.state}">${data.letter}</span>`);
	}
	$(".words").html(elementData.join(""));
	// $(".words").html('<span id="caret">|</span>'+`<span class="words state-0">${text}</span>`);
}

const onKeyPress = e => {
	const key = e.code;
	if((key !== 'Backspace' && !key.includes("Key")) || (currIndex+1>textData.length)) return;
	console.log(key);
	textData[currIndex].state = 1;
	currIndex++;
	// $("#caret").css('right', `${currIndex*300}px`);
	document.getElementById("caret").style.right = currIndex;
	console.log(`${currIndex*300}px`)
	renderData();
}

document.addEventListener("keyup", onKeyPress);
renderData();