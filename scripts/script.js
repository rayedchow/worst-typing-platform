let currIndex = 0;
const text = 'hello amogus susy';

const render = () => {
	$(".words").html('<span id="caret">|</span>'+`<span class="words state-0">${text}</span>`);
}

const onKeyPress = e => {
	console.log(e.key);
}

document.addEventListener("keyup", onKeyPress);
render();