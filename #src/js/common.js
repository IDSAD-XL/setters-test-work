//! Magnet circle at the first section
const magnetScroll = new MagnetMouse({
	magnet: {
		element: '#scrollWrapper',
		position: 'center',
		distance: 10,
	}
});

magnetScroll.init();

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
	document.addEventListener('click', (e) => {
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
