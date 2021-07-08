//!Check if mobile
const body = document.querySelector('body');
if (window.innerWidth < 1024) {
	body.classList.add('mobile')
}

//! Magnet circle at the first section
class hoverEffect {
	constructor(el) {
		this.el = el;
		this.scrollCircle = el.querySelector(".scroll-circle");
		this.scrollArrow = el.querySelector(".scroll-arrow");
		this.hover = false;
		this.calculatePosition();
		this.attachEventsListener();
		this.HandleScroll();
	}

	attachEventsListener() {
		window.addEventListener("mousemove", (e) => this.onMouseMove(e));
		window.addEventListener("resize", (e) => this.calculatePosition(e), { passive: true });
		window.addEventListener("scroll", (e) => this.calculatePosition(e), { passive: true });
	}

	HandleScroll() {
		gsap.to(this.scrollCircle, {
			rotate: 180,
			ease: Linear.easeNone
		});
	}

	calculatePosition() {
		gsap.set(this.el, {
			x: 0,
			y: 0
		});
		const box = this.el.getBoundingClientRect();
		this.x = box.left + box.width * 0.5;
		this.y = box.top + box.height * 0.5;
		this.width = box.width;
		this.height = box.height;
	}

	onMouseMove(e) {
		let hover = false;
		let hoverArea = this.hover ? 0.7 : 0.5;
		let x = e.clientX - this.x;
		let y = e.clientY - this.y;
		let distance = Math.sqrt(x * x + y * y);
		if (distance < this.width * hoverArea) {
			hover = true;
			if (!this.hover) {
				this.hover = true;
			}
			this.onHover(e.clientX, e.clientY);
		}

		if (!hover && this.hover) {
			this.onLeave();
			this.hover = false;
		}
	}

	onHover(x, y) {
		gsap.to(this.scrollCircle, {
			x: (x - this.x) * 0.2,
			y: (y - this.y) * 0.2,
			duration: 0.4,
			ease: Power2.easeOut
		});
		gsap.to(this.scrollArrow, {
			x: (x - this.x) * 0.3,
			y: (y - this.y) * 0.3,
			duration: 0.4,
			ease: Power2.easeOut
		});
	}

	onLeave() {
		gsap.to([this.scrollArrow, this.scrollCircle], {
			x: 0,
			y: 0,
			duration: 0.7,
			ease: Power2.easeOut
		});
	}
}
const magnetScroll = document.querySelector("#scrollWrapper");
const contentSection = document.querySelector('.content')
if (magnetScroll && contentSection) {
	new hoverEffect(magnetScroll);
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
const topSection = document.querySelector("#top-section")

if (scrollTopArrows) {
	scrollTopArrows.forEach((e) => {
		e.addEventListener('click', () => {
			// topSection.scrollIntoView({ behavior: "smooth" })
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

//! Popups
const popups = document.querySelectorAll(".popup")
const popupToggles = document.querySelectorAll(".open-popup")

if (popups) {
	popups.forEach((e) => {
		document.body.appendChild(e)
	})
}

//! Popup open
if (popups && popupToggles) {
	popupToggles.forEach((e) => {
		const targetPopup = document.getElementById(e.dataset.target)
		e.addEventListener('click', (evt) => {
			evt.preventDefault()
			openPopup(targetPopup)
		})
		const popupBody = targetPopup.querySelector('.popup-body')
		if (popupBody != null) {
			targetPopup.addEventListener('click', (e) => {
				e.preventDefault()
				const clicked = e.target
				if (clicked.classList.contains('open-popup')) return
				if (!popupBody.contains(clicked) && body.classList.contains('modal-open')) {
					closePopup(targetPopup)
				}
			})
		}
		const closeButton = targetPopup.querySelector('.close-popup')
		if (closeButton != null) {
			closeButton.addEventListener('click', (e) => {
				e.preventDefault()
				closePopup(targetPopup)
			})
		}
	})
}


function closePopup(popup) {
	popup.classList.add('popup_hide')
	body.classList.remove('modal-open')
}

function openPopup(popup) {
	popup.classList.remove('popup_hide')
	body.classList.add('modal-open')
}

//!Sliders
const sliders = document.querySelectorAll('.splide');
const slidersOptions = {
	card: {
		type: 'loop',
		autoplay: true,
		interval: 3000,
		pauseOnHover: true,
	},
	case: {
		type: 'loop',
		autoplay: false,
		speed: 1200,
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
			slidersOptions.card : slidersOptions.case
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

//!Top section heading 
const glitchWords = ['стратегии', 'креатив', 'дизайн']
const glitchTitle = document.querySelector('#top-section__title-glitch-word')

if (glitchTitle) {
	glitchWord(0)
}

function glitchWord(ind) {
	const index = (ind + 1) > (glitchWords.length - 1) ? 0 : ind + 1
	const word = glitchWords[index]
	glitchLoop(0, word, word.length)
	setTimeout(glitchWord, 2300, index)
}

function glitchLoop(count, word) {
	if (count > 3) {
		setGlitchWord(word)
		return
	}
	setGlitchWord(randomString(word.length))
	setTimeout(glitchLoop, 50, count + 1, word)
}

function setGlitchWord(word) {
	glitchTitle.innerHTML = word
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

//!Cases list
const animateText = document.querySelectorAll('.text_animate-show')
const animateBlocks = document.querySelectorAll('.block_animate-show')
const casesList = document.querySelector('#casesList')
const observeElements = document.querySelectorAll('.to-observe')

function createAnimatedTextElement(el) {
	const content = el.innerHTML
	const newInner = `<div class="text_animate-show-inner">${content}</div>`
	el.innerHTML = newInner
}

animateText.forEach((e) => {
	createAnimatedTextElement(e)
})

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animated');
		}
	});
});

Array.prototype.forEach.call(observeElements, (el) => {
	observer.observe(el);
});

if (casesList) {
	const casesListName = casesList.querySelectorAll('.cases-list__item-name-inner')
	let delay = 0
	casesListName.forEach((e) => {
		e.style.animationDelay = `${delay}ms`;
		delay += 200
	})
}



//!Cards parallax
class ParallaxEffect {
	constructor(el, block) {
		this.block = block
		this.blockTop = getCoords(block).top
		this.coefficient = el.k
		this.column = document.getElementById(el.id)
		this.topCoods = getCoords(this.column).top
		this.triggerPoint =
			el.trigger == null ? this.topCoods : this.topCoods + el.trigger
		this.attachEventsListener()
	}
	attachEventsListener() {
		window.addEventListener("scroll", (e) => this.calculatePosition(), { passive: true })
	}
	calculatePosition() {
		if (window.scrollY > this.blockTop) {
			const distance = pageYOffset - this.blockTop
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
		this.column.style.transform = "none";
	}
}

function getCoords(e) {
	var box = e.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}

const parallaxBlocks = [
	{
		blockId: "cases-card-layout",
		columns: [
			{ id: "casesCardColumnLeft", k: 0.5 },
			{ id: "casesCardColumnRight", k: 0.1 }
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
		e.addEventListener('mousemove', (e) => {
			e.preventDefault()
			const parent = e.target.closest('.image_animation-move')
			const targetCoords = parent.getBoundingClientRect();
			const xCoord = e.clientX - targetCoords.right;
			const yCoord = e.clientY - targetCoords.top;
			gsap.to(image, {
				x: xCoord * 0.02,
				y: yCoord * 0.02,
				duration: 0.6,
				scaleX: 1.2,
				scaleY: 1.2,
				ease: Power2.ease
			});
		})
		e.addEventListener('mouseout', (e) => {
			e.preventDefault()
			gsap.to(image, {
				duration: 0.61,
				scaleX: 1.5,
				scaleY: 1.5,
				ease: Power2.ease
			})
		})
	})
}