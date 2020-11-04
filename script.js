const cards = document.getElementsByClassName("card");
const startDiv = document.getElementsByClassName("start")[0];
const containerDiv = document.getElementsByClassName("container")[0];
const finishDiv = document.getElementsByClassName("finish")[0];
const fill = document.getElementsByClassName("fill")[0];
const solutions = [ ["💩"],
					["🏀", "⛹"],
					["📋", "📝", "✏", "🖊", "📐", "📏", "🧮", "📈", "📉", "📚", "📖"],
					["🥞", "🥓", "🍔", "🥤", "☕", "🍩", "🍪"],
					["📱", "💻", "📞", "☎", "💬", "💭", "🗨", "🗣", "🌐"],
					["🐨", "🛏", "🚿"],
					["🦥"],
					["🍰", "🏀", "⛹", "🏟", "📷", "📸", "📹", "🎥", "📽", "🖌", "🖍", "✏"],
					["🎫", "🎟", "🎨", "🖨", "🖥", "🖌", "✏"],
					["🎱"],
					["🚏", "🗺", "🚉", "🚊", "🚇", "🚆", "🚂", "🚈", "🚅", "🚄", "🚝", "🚕", "🚖", "🚌", "🚎", "🚲"],
					["🏴󠁧󠁢󠁷󠁬󠁳󠁿", "🇭🇺", "🏆", "🥇", "⚽", "⛳", "🏌", "🏌️", "♂", "🎫", "🍽", "🤳", "😱", "🏟", "📷", "📸"],
					["🏳", "🌈", "👨‍❤", "👨", "👨‍❤", "💋‍👨", "🧑‍🤝‍🧑", "👬", "👨‍👨‍👦"],
					["🤳", "😴", "📱", "⏰", "🛌"],
					["♠", "♣", "♥", "♦", "🃏", "🎰", "🎲"],
					["💚", "🤍", "⚪", "🟢"],
					["🔊", "🇸🇪", "🐊", "💧", "🎧", "🎸", "🕺", "💃"],
					["🚘", "🚗", "🚙", "🚕", "🚖"],
					["🤷", "🤷‍♂", "👩‍❤", "👨", "📱", "⏰", "⌛", "⏳", "💻", "📞", "💌", "🗓", "📆", "📪", "🦠"],
					["😍", "🥰", "😘", "🍑", "🍆", "❤", "💕", "💞", "💓", "💗", "💖", "💘", "💝"],
					["🍾", "🍹", "🍸", "🥃", "🍷", "🥂", "🍻", "🍺"]];
var index = -1;

function reset() {
	for(let i = 0; i < cards.length; i++) {
		if(i != index)
			cards[i].style.setProperty("display", "none");
		else
			cards[i].style.setProperty("display", "flex");
	}
}

async function check() {
	if(solutions[index].includes(cards[index].children[2].value)) {
		index++;

		await color(index - 1, "green", 200);
		await color(index - 1, "black", 200);

		await change(false, index - 1, 800);
		if(index == 21)
			await finish();

		reset();
	}
	else {
		await color(index, "tomato", 200);
		await color(index, "black", 200);
	}
}

async function start() {
	index = 0;
	reset();

	await change(true, 0, 800);

	startDiv.style.setProperty("display", "none");
	containerDiv.style.setProperty("display", "flex");
}

async function change(e1, e2, d) {
	return new Promise(resolve => {
		if(e1) {
			startDiv.style.setProperty("opacity", "0");
		}
		else {
			cards[e2].style.setProperty("opacity", "0");
			fill.style.setProperty("width", `${index / 21 * 100}%`);
		}

		window.requestAnimationFrame(function() {
			setTimeout(() => {
				resolve();
			}, d);
		});
	});
}

async function color(i, c, d) {
	return new Promise(resolve => {
		cards[i].style.setProperty("border-color", c);

		window.requestAnimationFrame(function() {
			setTimeout(() => {
				resolve();
			}, d);
		});
	});
}

async function finish() {
	containerDiv.style.setProperty("display", "none");
	finishDiv.style.setProperty("display", "flex");
}