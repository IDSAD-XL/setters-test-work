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