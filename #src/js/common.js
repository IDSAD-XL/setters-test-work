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
requestTextarea.setAttribute("style", "height:" + (requestTextarea.scrollHeight) + "px;");
requestTextarea.addEventListener("input", OnInput, false);

function OnInput() {
	if (this.height >= 500) return;
	this.style.height = "auto";
	this.style.height = (this.scrollHeight + 5) + "px";
}
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
const popupRequest = document.querySelector('#popup-request')
const popupRequestOpenTriggers = document.querySelectorAll(".open-request-popup")
const popupRequestCloseTriggers = document.querySelectorAll(".close-request-popup")

popupRequestOpenTriggers.forEach((e) => {
	e.addEventListener('click', openRequestPopup, false)
})

popupRequestCloseTriggers.forEach((e) => {
	e.addEventListener('click', closeRequestPopup, false)
})

function openRequestPopup(evt) {
	evt.preventDefault()
	popupRequest.classList.remove('popup_hide')
	body.classList.add('modal-open')
}

function closeRequestPopup(evt) {
	evt.preventDefault()
	popupRequest.classList.add('popup_hide')
	body.classList.remove('modal-open')
}


