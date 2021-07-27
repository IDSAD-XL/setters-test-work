export class GlitchWord {
	constructor(words, body) {
		this.words = words
		this.body = body
	}

	start() {
		this.glitchWord(0)
	}

	glitchWord(ind) {
		const index = (ind + 1) > (this.words.length - 1) ? 0 : ind + 1
		const word = this.words[index]
		this.glitchLoop(0, word, word.length)
		window.setTimeout(this.glitchWord, 2300, index)
	}

	glitchLoop(count, word) {
		if (count > 3) {
			this.setGlitchWord(word)
			return
		}
		console.log(this);
		const randString = randomString(word.length)
		this.setGlitchWord = randString
		window.setTimeout(this.glitchLoop, 50, count + 1, word)
	}

	setGlitchWord(word) {
		this.body.innerHTML = word
	}
}

function randomString(len) {
	let str = ''
	for (let i = 0; i < len; i++) {
		str += String.fromCharCode(randomInteger(33, 126))
	}
	return str
}

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
