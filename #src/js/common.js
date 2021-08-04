import { HoverEffect } from "./modules/_HoverEffect.js";
import { Popup } from "./modules/_Popup.js";
import { GlitchWord } from "./modules/_GlitchWord.js"
import { ScrollSpy } from "./modules/_ScrollSpy.js";
import { DoubleSlider } from "./modules/_DoubleSlider.js";
import { AudioPlayer } from "./modules/_AudioPlayer.js";

//!Check if mobile
const body = document.querySelector('body');
if (window.innerWidth < 1024) {
	body.classList.add('mobile')
}

//! Magnet circle at the first section

const magnetScroll = document.querySelector("#scrollWrapper");
const contentSection = document.querySelector('.content')
if (magnetScroll && contentSection) {
	new HoverEffect(magnetScroll);
	magnetScroll.addEventListener('click', (e) => {
		e.preventDefault()
		contentSection.scrollIntoView({ behavior: "smooth" })
	})
}


//! Mobile burger menu
const menuCheckbox = document.querySelector('#menu__toggle')


if (menuCheckbox) {
	menuCheckbox.addEventListener('change', () => {
		if (menuCheckbox.checked) {
			setBodyScrollable()
		} else {
			setBodyUnScrollable()
		}
	})
}

function setBodyScrollable() {
	body.classList.add('menu-open')
}

function setBodyUnScrollable() {
	body.classList.remove('menu-open')
}

//! Footer scroll to top arrows
const scrollTopArrows = document.querySelectorAll(".footer-sticky__arrow-top")

if (scrollTopArrows) {
	scrollTopArrows.forEach((e) => {
		e.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			})
		})
	})
}

//! Footer hide at top section
const stickyFooter = document.querySelector("#footer-sticky")
const gradientBorder = document.querySelector('#gradient-border')
const contactBlock = document.querySelector('#contact-content')

if (!contactBlock) {
	window.addEventListener("scroll", () => {
		if (window.scrollY == 0) {
			stickyFooter.classList.add('footer-sticky_hide')
			gradientBorder.classList.add('gradient-border_fullscreen')
		}
		else {
			stickyFooter.classList.remove('footer-sticky_hide')
			gradientBorder.classList.remove('gradient-border_fullscreen')
		}
	}, { passive: true })
} else {
	stickyFooter.classList.remove('footer-sticky_hide')
	gradientBorder.classList.remove('gradient-border_fullscreen')
}

//! Popups
const popups = document.querySelectorAll(".popup")
const popupToggles = document.querySelectorAll(".open-popup")

if (popups) {
	popups.forEach((e) => {
		document.body.appendChild(e)
	})
}

popupToggles.forEach((e) => {
	new Popup(e)
})

//!Sliders
const sliders = document.querySelectorAll('.splide__default');
const slidersOptions = {
	card: {
		type: 'loop',
		autoplay: true,
		interval: 3000,
		pauseOnHover: true,
	},
	primary: {
		type: 'loop',
		autoplay: false,
		speed: 1200,
		gap: 20,
		breakpoints: {
			1023: {
				arrows: false,
				padding: {
					right: '40px',
					left: '40px'
				}
			}
		}
	}
}
if (sliders) {
	sliders.forEach((e) => {
		const options = e.classList.contains('card-slider') ?
			slidersOptions.card : slidersOptions.primary
		const slider = new Splide(e, options).mount()
		const sliderNumber = e.querySelector('.splide__slide-number')
		const slidesCount = slider.length
		sliderNumber.innerHTML = `1/${slidesCount}`
		slider.on('moved', () => {
			const currentSlide = slider.index
			sliderNumber.innerHTML = `${currentSlide + 1}/${slidesCount}`
		})
		slider.on('move', (oldIndex, newIndex, destSlide) => {
			const currentSlide = e.querySelector('.is-active')
			currentSlide.classList.remove('splide__next-slide')
			const nextSlide = currentSlide.nextElementSibling
			nextSlide.classList.add('splide__next-slide')
		})
	})
}

const doubleSliders = document.querySelectorAll('.double-slider')
if (doubleSliders) {
	doubleSliders.forEach((e) => {
		new DoubleSlider(e)
	})
}

//!Top section heading 
const glitchWords = ['стратегии', 'креатив', 'дизайн']
const glitchTitle = document.querySelector('#top-section__title-glitch-word')
if (glitchTitle) {
	const mainTitleGlitch = new GlitchWord(glitchWords, glitchTitle)
	console.log(mainTitleGlitch);
	mainTitleGlitch.start()
}


//!Card show 
const cards = document.querySelectorAll('.card_show-animate')
const cardLayout = document.querySelector('.card-layout')
let lowestPoint
let cardsShowedCount

setAnimateCards()
function setAnimateCards() {
	if (cardLayout && cards) {
		hideAllCards()
		document.addEventListener('scroll', animateCardsShow, { passive: true })
		lowestPoint = cardLayout.scrollTop
		cardsShowedCount = 0
		animateCardsShow()
	}
}

function hideAllCards() {
	cards.forEach((card) => {
		card.classList.remove('shown', 'visible')
	})
}

function animateCardsShow() {
	if (cardsShowedCount == cards.length) {
		document.removeEventListener('scroll', animateCardsShow)
	}
	let visibleCards = []
	cards.forEach((e) => {
		if (isVisible(e) && !e.classList.contains('visible')) {
			e.classList.add('visible')
			visibleCards.push(e)
		}
	})
	let leftCornerElement = visibleCards[0]
	visibleCards.forEach((e) => {
		if (e.offsetLeft < leftCornerElement.offsetLeft &&
			e.offsetTop < leftCornerElement.offsetTop) {
			leftCornerElement = e
		}
	})
	visibleCards.forEach((e) => {
		let distance = (Math.abs(leftCornerElement.offsetTop - e.offsetTop)) +
			(Math.abs(leftCornerElement.offsetLeft - e.offsetLeft))
		e.style.transitionDelay = `${distance}ms`
		e.style.animationDelay = `${distance}ms`
		e.classList.add('shown')
		cardsShowedCount++
	})

}

function isVisible(elem) {
	const bound = elem.getBoundingClientRect()
	return ((bound.top > 0 || bound.top + elem.offsetHeight > 0) && bound.top < window.innerHeight)
}

//!Cases
const casesContent = document.querySelector('.cases-content')
const casesSwitcher = document.getElementsByName('cases-switch')
const casesSwitchList = document.getElementById('cases-switch-list')
const casesSwitchCards = document.getElementById('cases-switch-cards')

if (casesSwitcher) {
	casesSwitcher.forEach((e) => {
		e.addEventListener('change', (e) => {
			if (casesSwitchCards.checked) {
				casesContent.classList.add('mode-cards')
				casesContent.classList.remove('mode-list')
				setAnimateCards()
			}
			else {
				casesContent.classList.remove('mode-cards')
				casesContent.classList.add('mode-list')
			}
		})
	})
}

//!Text animations
const animateText = document.querySelectorAll('.text_animate-show, h1')
const animateBlocks = document.querySelectorAll('.block_animate-show, p, h2, h3, h4, h5, h6')
const casesList = document.querySelector('#casesList')

function createAnimatedTextElement(el) {
	const content = el.innerHTML
	if (!el.classList.contains('block_animate-show')
		&& !el.classList.contains('no-animation')) {
		el.classList.add('to-observe')
		el.classList.add('text_animate-show')
		const newInner = `<div class="text_animate-show-inner">${content}</div>`
		el.innerHTML = newInner
	}
}

function createAnimatedBlocksElement(el) {
	if (!el.classList.contains('text_animate-show')
		&& !el.classList.contains('no-animation')) {
		el.classList.add('to-observe')
		el.classList.add('block_animate-show')
	}
}

animateText.forEach((e) => {
	createAnimatedTextElement(e)
})

animateBlocks.forEach((e) => {
	createAnimatedBlocksElement(e)
})

const observeElements = document.querySelectorAll('.to-observe')
let tempDelay = 0
const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
			const d = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
			const box = entry.target.getBoundingClientRect()
			const distance = Math.sqrt(box.top ** 2 + box.left ** 2)
			const k = 1 / (d / distance)
			const delay = 500 * k + tempDelay
			entry.target.style.transitionDelay = `${delay}ms`
			entry.target.style.animationDelay = `${delay}ms`
			if (entry.target.classList.contains('text_animate-show')) {
				const textInner = entry.target.querySelector('.text_animate-show-inner')
				textInner.style.transitionDelay = `${delay}ms`
				textInner.style.animationDelay = `${delay}ms`
			}
			entry.target.classList.add('animated');
			tempDelay += 200
		}
	});
});
setInterval(() => {
	if (tempDelay != 0) {
		tempDelay = 0
	}
}, 50)

Array.prototype.forEach.call(observeElements, (el) => {
	observer.observe(el);
});

//!Cards parallax
class ParallaxEffect {
	constructor(el, block) {
		this.block = block
		this.blockTop = getCoords(block)
		this.coefficient = el.k
		this.column = document.getElementById(el.id)
		this.topCoods = getCoords(this.column)
		this.triggerPoint =
			el.trigger == null ? this.topCoods : this.topCoods + el.trigger
		this.attachEventsListener()
	}
	attachEventsListener() {
		window.addEventListener("scroll", (e) => this.calculatePosition(), { passive: true })
	}
	calculatePosition() {
		const blockBox = this.block.getBoundingClientRect()
		if (blockBox.top < 0) {
			const distance = pageYOffset - blockBox.top
			const y = -distance * this.coefficient
			this.move(y)
		}
		else {
			this.setDefaultPosition()
		}
	}
	move(y) {
		gsap.to(this.column, {
			y: y,
			duration: 0.4,
			ease: Power1.easeOut
		})
	}
	setDefaultPosition() {
		gsap.to(this.column, {
			y: 0,
			duration: 0.4,
			ease: Power1.easeOut
		})
	}
}

function getCoords(e) {
	const box = e.getBoundingClientRect();
	return box.top + pageYOffset

}

const parallaxBlocks = [
	{
		blockId: "cases-card-layout",
		columns: [
			{ id: "casesCardColumnLeft", k: 0.1 },
			{ id: "casesCardColumnRight", k: 0.05 }
		]
	}
]

if (!body.classList.contains('mobile')) {
	parallaxBlocks.forEach((e) => {
		const block = document.getElementById(e.blockId)
		if (block) {
			e.columns.forEach((e) => {
				new ParallaxEffect(e, block)
			})
		}
	})
}

//!Readmore
const readmoreBlocks = document.querySelectorAll('.readmore')
readmoreBlocks.forEach((block) => {
	const expandButton = block.querySelector('.readmore__expand')
	expandButton.addEventListener('click', (button) => {
		button.preventDefault();
		block.style.maxHeight = `${block.scrollHeight + 100}px`
		block.classList.remove('hidden')
		block.classList.add('expanded')
	})
})

//!List Image animation
const itemsToAnimateImage = document.querySelectorAll('.image_animation-move')

if (itemsToAnimateImage) {
	itemsToAnimateImage.forEach((e) => {
		const image = e.querySelector('.image_to-animate')
		const scale = image.classList.contains('image_animation-no-scale')
		let enteredPoint = { x: 0, y: 0 }
		e.addEventListener('mouseenter', (e) => {
			enteredPoint.x = e.clientX
			enteredPoint.y = e.clientY
		})
		e.addEventListener('mousemove', (e) => {
			e.preventDefault()
			const parent = e.target.closest('.image_animation-move')
			const xCoord = e.clientX - enteredPoint.x
			const yCoord = e.clientY - enteredPoint.y
			if (!scale) {
				gsap.to(image, {
					x: xCoord * 0.02,
					y: yCoord * 0.02,
					duration: 0.6,
					scaleX: 1.2,
					scaleY: 1.2,
					ease: Power2.ease
				});
			}
			else {
				gsap.to(image, {
					x: xCoord * 0.02,
					y: yCoord * 0.02,
					duration: 0.6,
					scaleX: 1.2,
					scaleY: 1.2,
					ease: Power2.ease
				});
			}
		})
		e.addEventListener('mouseout', (e) => {
			e.preventDefault()
			if (!scale) {
				gsap.to(image, {
					x: 0,
					y: 0,
					duration: 0.61,
					scaleX: 1.5,
					scaleY: 1.5,
					ease: Power2.ease
				})
			}
			else {
				gsap.to(image, {
					x: 0,
					y: 0,
					duration: 0.61,
					ease: Power2.ease
				})
			}

		})
	})
}

class LeafSlider {
	constructor(block) {
		this.block = block
		this.index = 0
		this.slides = block.querySelectorAll('.leaf-slider__slide')
		this.buttonPrev = block.querySelector('.leaf-slider--prev')
		this.buttonNext = block.querySelector('.leaf-slider--next')
		this.numeric = block.querySelector('.leaf-slider__numeric')
		this.locked = false
		this.setSlidesClasses()
		this.mount()
		this.attachEventsListener()
	}
	mount() {
		const leafTrack = document.createElement("div")
		// this.setSliderHeight(this.findHighestSlide())
		leafTrack.classList.add('leaf-slider__track')
		this.slides.forEach((slide) => {
			leafTrack.appendChild(slide)
			slide.classList.add('mounted')
		})
		this.track = leafTrack
		this.block.appendChild(leafTrack)
		this.adaptiveHeight()
		this.setNumeric()
	}
	setSlidesClasses() {
		let counter = 0
		this.slides.forEach((slide) => {
			slide.classList.add(`leaf-slider__slide_${counter}`)
			counter++
		})
	}
	attachEventsListener() {
		this.buttonPrev.addEventListener('click', (e) => {
			e.preventDefault()
			if (this.locked) return
			this.slideDown(e)
			this.lockSlider()
		})
		this.buttonNext.addEventListener('click', (e) => {
			e.preventDefault()
			if (this.locked) return
			this.slideUp(e)
			this.lockSlider()
		})
		window.addEventListener('resize', (e) => {
			e.preventDefault()
			this.adaptiveHeight()
		})
	}
	slideUp() {
		if (this.index + 1 > this.slides.length - 1) {
			return
		}
		this.setPreviousSlide(this.slides[this.index])
		this.index++
		this.setActive(this.slides[this.index])
		this.slides[this.index].classList.add('left')
		this.setNumeric()
	}
	slideDown() {
		if (this.index - 1 < 0) {
			return
		}
		this.setPreviousSlide(this.slides[this.index])
		this.index--
		this.setActive(this.slides[this.index])
		this.slides[this.index].classList.add('right')
		this.setNumeric()
	}
	setPreviousSlide(slide) {
		this.slides.forEach((e) => {
			e.classList.remove('previous-slide')
		})
		slide.classList.add('previous-slide')
	}
	setActive(slide) {
		this.slides.forEach((e) => {
			e.classList.remove('active', 'left', 'right')
		})
		slide.classList.add('active')
	}
	lockSlider() {
		this.locked = true
		setTimeout(() => this.locked = false, 900)
	}
	setNumeric() {
		this.numeric.innerHTML = `${this.index + 1}/${this.slides.length}`
	}
	adaptiveHeight() {
		this.setSliderHeight(this.findHighestSlide())
	}
	findHighestSlide() {
		let finalHeight = 0
		this.slides.forEach((slide) => {
			if (slide.offsetHeight > finalHeight) {
				finalHeight = slide.offsetHeight
			}
		})
		return finalHeight
	}
	setSliderHeight(height) {
		this.block.style.height = `${height}px`
	}

}

const leafSliders = document.querySelectorAll('.leaf-slider')
leafSliders.forEach((e) => {
	const slider = new LeafSlider(e)
	console.log(slider);
})

//!ScrollSpy
const scrollButtons = document.querySelectorAll('.scroll-button')
const careerScrollSpy = new ScrollSpy(scrollButtons)

//!AudioPlayer
const audioPlayers = document.querySelectorAll('.audio-player')
audioPlayers.forEach((e) => {
	new AudioPlayer(e)
})

//!Content loaded
const careerSponsors = document.querySelector('.career__sponsors')
if (careerSponsors) {
	document.addEventListener("DOMContentLoaded", () => {
		careerSponsors.classList.add('loaded')
	});
}

//!Career tabs
const careerQuestionTabs = document.querySelectorAll('.career__question-tabs-item')
if (careerQuestionTabs) {
	careerQuestionTabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			careerQuestionTabs.forEach((e) => {
				e.classList.remove('active')
			})
			tab.classList.add('active')
		})
	})
}
