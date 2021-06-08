const scrollWrapper = document.querySelector('#scrollWrapper')
const scrollCircle = document.querySelector('#scrollCircle')
const scrollArrow = document.querySelector('#scrollArrow')

let magnetScroll = new MagnetMouse({
	magnet: {
		element: '#scrollWrapper',
		position: 'center',
		distance: 10,
	}
});

magnetScroll.init();