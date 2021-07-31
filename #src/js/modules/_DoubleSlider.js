export class DoubleSlider {
	constructor(block) {
		this.block = block
		this.textSlider = block.querySelector('.double-slider__text')
		this.imageSldier = block.querySelector('.double-slider__image')
		this.sliderNumber = block.querySelector('.splide__slide-number')
		this.mountSliders()
		this.mountSliderNumber()
	}
	mountSliders() {
		const imageSlider = new Splide(this.imageSldier, {
			type: 'fade',
			perPage: 1,
			pagination: false,
			arrows: false,
			drag: false,

		}).mount()
		const textSlider = new Splide(this.textSlider, {
			type: 'loop',
			perPage: 1,
			pagination: false
		})
		textSlider.sync(imageSlider).mount()
		this.pimarySlider = textSlider
		this.secondarySlider = imageSlider
	}
	mountSliderNumber() {
		const slidesCount = this.pimarySlider.length
		this.sliderNumber.innerHTML = `1/${slidesCount}`
		this.pimarySlider.on('moved', () => {
			const currentSlide = this.pimarySlider.index
			this.sliderNumber.innerHTML = `${currentSlide + 1}/${slidesCount}`
		})
		this.pimarySlider.on('move', (oldIndex, newIndex, destSlide) => {
			const currentSlide = this.textSlider.querySelector('.is-active')
			currentSlide.classList.remove('splide__next-slide')
			const nextSlide = currentSlide.nextElementSibling
			nextSlide.classList.add('splide__next-slide')
		})
	}
}