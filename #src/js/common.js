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
		window.addEventListener("resize", (e) => this.calculatePosition(e));
	}

	HandleScroll() {
		gsap.to(this.scrollCircle, {
			scrollTrigger: {
				scrub: true
			},
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

let magnetScroll = document.querySelector("#scrollWrapper");
new hoverEffect(magnetScroll);

//! Mobile burger menu
const menuCheckbox = document.querySelector('#menu__toggle')
const body = document.querySelector('body');

menuCheckbox.addEventListener('change', () => {
	if (menuCheckbox.checked) {
		setBodyScrollable()
	} else {
		setBodyUnScrollable()
	}
})

function setBodyScrollable() {
	body.classList.add('menu-open')
}

function setBodyUnScrollable() {
	body.classList.remove('menu-open')
}


//! Footer scroll to top arrows
const scrollTopArrows = document.querySelectorAll(".footer-sticky__arrow-top")
const topSection = document.querySelector("#top-section")
scrollTopArrows.forEach((e) => {
	e.addEventListener('click', () => {
		topSection.scrollIntoView({ behavior: "smooth" })
	})
})

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
})

//! Popups
//? textarea
const requestTextarea = document.querySelector("#request-popup__details");
//? textarea mobile
function setRequestPopupPlaceholder() {
	requestTextarea.placeholder = (window.innerWidth > 2024) ?
		"Пожалуйста, максимально подробно опишите задачу, которую вы ставите перед агентством. Какую цель вы хотели бы достичь или какую главную проблему вы хотели бы решить с нашей помощью?"
		:
		"Пожалуйста, максимально подробно опишите задачу, которую вы ставите перед агентством"
}
setRequestPopupPlaceholder()
window.addEventListener('resize', setRequestPopupPlaceholder, false)


//! Popup open
const popups = document.querySelectorAll(".popup")
const popupToggles = document.querySelectorAll(".open-popup")

popupToggles.forEach((e) => {
	const targetPopup = document.getElementById(e.dataset.target)
	e.addEventListener('click', (evt) => {
		evt.preventDefault()
		openPopup(targetPopup)
	})
	const popupBody = targetPopup.querySelector('.popup-body')
	targetPopup.addEventListener('click', (e) => {
		e.preventDefault()
		const clicked = e.target
		if (clicked.classList.contains('open-popup')) return
		if (!popupBody.contains(clicked) && body.classList.contains('modal-open')) {
			closePopup(targetPopup)
		}
	})
	const closeButton = targetPopup.querySelector('.close-popup')
	closeButton.addEventListener('click', (e) => {
		e.preventDefault()
		closePopup(targetPopup)
	})
})

function closePopup(popup) {
	popup.classList.add('popup_hide')
	body.classList.remove('modal-open')
}

function openPopup(popup) {
	popup.classList.remove('popup_hide')
	body.classList.add('modal-open')
}
//!Card sliders
const sliders = document.querySelectorAll('.splide');
sliders.forEach((e) => {
	new Splide(e, {
		autoplay: true,
		interval: 3000
	}).mount();
})
