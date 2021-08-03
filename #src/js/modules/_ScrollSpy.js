export class ScrollSpy {
	constructor(buttons) {
		this.buttons = buttons
		this.attachEventsListeners()
	}
	attachEventsListeners() {
		this.buttons.forEach((e) => {
			e.addEventListener('click', () => {
				const block = document.getElementById(e.dataset.scroll)
				window.scrollTo({
					top: this.getBlockScrollOffset(block) - 170,
					behavior: "smooth"
				})
			})
		})
		window.addEventListener('scroll', () => {
			this.checkScroll()
		})
	}
	checkScroll() {
		let button
		let temp = {
			top: 100000,
			bottom: 100000
		}
		this.buttons.forEach((e) => {
			const block = document.getElementById(e.dataset.scroll)
			if (block) {
				const box = block.getBoundingClientRect()
				if (window.scrollY > this.getBlockScrollOffset(block) - window.innerHeight / 2) {
					button = e
				}
			}
		})
		this.setActive(button)
	}
	checkOnScreen(e) {
		const box = e.getBoundingClientRect()
		if ((box.top < 0 && box.bottom < 0)
			|| (box.top > 0 && box.bottom > 0)
		) {

		}
	}
	getBlockScrollOffset(block) {
		const box = block.getBoundingClientRect()
		return box.top + window.pageYOffset
	}
	setActive(button) {
		if (!button) return
		const input = button.querySelector('input')
		if (input) {
			input.checked = true
		}
	}
};
