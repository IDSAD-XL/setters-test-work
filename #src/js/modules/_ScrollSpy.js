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
		let temp = 10000
		this.buttons.forEach((e) => {
			const block = document.getElementById(e.dataset.scroll)
			if (block) {
				const box = block.getBoundingClientRect()
				if (box.top < temp && box.top > 0) {
					temp = box.top
					button = e
				}
			}
		})
		this.setActive(button)
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
