export class AudioPlayer {
	constructor(block) {
		this.audioPlayerContainer = block
		this.playIconContainer = block.querySelector('.audio-player__play')
		this.seekSlider = block.querySelector('.seek-slider')
		this.audio = block.querySelector('audio')
		this.durationContainer = block.querySelector('.audio-player__duration')
		this.playState = 'play'
		this.mount()
	}
	mount() {
		if (this.audio.readyState > 0) {
			this.displayDuration();
			this.setSliderMax();
		} else {
			this.audio.addEventListener('loadedmetadata', () => {
				this.displayDuration();
				this.setSliderMax();
			});
		}
		this.attachEventsListeners()
	}
	attachEventsListeners() {
		this.playIconContainer.addEventListener('click', () => {
			if (this.playState === 'play') {
				this.audio.play();
				this.playState = 'pause';
			} else {
				this.audio.pause();
				this.playState = 'play';
			}
		});
		this.seekSlider.addEventListener('input', (e) => {
			this.showRangeProgress(e.target);
		});
		this.seekSlider.addEventListener('change', () => {
			this.audio.currentTime = this.seekSlider.value;
			this.whilePlaying()
		});

	}
	showRangeProgress = (rangeInput) => {
		if (rangeInput === this.seekSlider) this.audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
		else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
	}
	calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${returnedSeconds}`;
	}
	setSliderMax = () => {
		this.seekSlider.max = Math.floor(this.audio.duration);
	}
	displayDuration = () => {
		this.durationContainer.textContent = this.calculateTime(this.audio.duration);
	}
	whilePlaying = () => {
		this.seekSlider.value = Math.floor(this.audio.currentTime);
		this.audioPlayerContainer.style.setProperty('--seek-before-width', `${this.seekSlider.value / this.seekSlider.max * 100}%`);
	}
}

// const playIconContainer = document.getElementById('play-icon');
// const audioPlayerContainer = document.getElementById('audio-player-container');
// const seekSlider = document.getElementById('seek-slider');
// let playState = 'play';

// playIconContainer.addEventListener('click', () => {
// 	if (playState === 'play') {
// 		audio.play();
// 		requestAnimationFrame(whilePlaying);
// 		playState = 'pause';
// 	} else {
// 		audio.pause();
// 		cancelAnimationFrame(raf);
// 		playState = 'play';
// 	}
// });


// const showRangeProgress = (rangeInput) => {
// 	if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
// 	else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
// }

// seekSlider.addEventListener('input', (e) => {
// 	showRangeProgress(e.target);
// });




// /** Implementation of the functionality of the audio player */

// const audio = document.querySelector('audio');
// const durationContainer = document.getElementById('duration');
// const currentTimeContainer = document.getElementById('current-time');
// let raf = null;

// const calculateTime = (secs) => {
// 	const minutes = Math.floor(secs / 60);
// 	const seconds = Math.floor(secs % 60);
// 	const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
// 	return `${minutes}:${returnedSeconds}`;
// }

// const displayDuration = () => {
// 	durationContainer.textContent = calculateTime(audio.duration);
// }

// const setSliderMax = () => {
// 	seekSlider.max = Math.floor(audio.duration);
// }

// const displayBufferedAmount = () => {
// 	const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
// 	audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
// }

// const whilePlaying = () => {
// 	seekSlider.value = Math.floor(audio.currentTime);
// 	currentTimeContainer.textContent = calculateTime(seekSlider.value);
// 	audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
// 	raf = requestAnimationFrame(whilePlaying);
// }

// if (audio.readyState > 0) {
// 	displayDuration();
// 	setSliderMax();
// 	displayBufferedAmount();
// } else {
// 	audio.addEventListener('loadedmetadata', () => {
// 		displayDuration();
// 		setSliderMax();
// 		displayBufferedAmount();
// 	});
// }

// audio.addEventListener('progress', displayBufferedAmount);

// seekSlider.addEventListener('input', () => {
// 	currentTimeContainer.textContent = calculateTime(seekSlider.value);
// 	if (!audio.paused) {
// 		cancelAnimationFrame(raf);
// 	}
// });

// seekSlider.addEventListener('change', () => {
// 	audio.currentTime = seekSlider.value;
// 	if (!audio.paused) {
// 		requestAnimationFrame(whilePlaying);
// 	}
// });