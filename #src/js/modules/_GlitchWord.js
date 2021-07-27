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
		window.setTimeout(this.glitchWord.bind(this), 2300, index)
	}

	glitchLoop(count, word) {
		if (count > 3) {
			this.setGlitchWord(word)
			return
		}
		this.setGlitchWord(this.randomString(word.length))
		window.setTimeout(this.glitchLoop.bind(this), 50, count + 1, word)
	}

	setGlitchWord(word) {
		this.body.innerHTML = word
	}

	randomString(len) {
		let str = ''
		for (let i = 0; i < len; i++) {
			str += String.fromCharCode(this.randomInteger(33, 126))
		}
		return str
	}

	randomInteger(min, max) {
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}
}
