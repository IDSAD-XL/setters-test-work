export class AudioPlayer {
	constructor(block) {
		this.audioPlayerContainer = block
		this.playIconContainer = block.querySelector('.audio-player__button')
		this.seekSlider = block.querySelector('.seek-slider')
		this.audio = block.querySelector('audio')
		this.durationContainer = block.querySelector('.audio-player__duration')
		this.playState = 'play'
		this.rAF = null;
		this.mount()
	}
	mount() {
		if (this.audio.readyState > 0) {
			this.displayDuration();
			requestAnimationFrame(this.whilePlaying);
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
				requestAnimationFrame(this.whilePlaying);
				this.playIconContainer.classList.add('play')
				this.playIconContainer.classList.remove('pause')
				this.playState = 'pause';
			} else {
				this.audio.pause();
				cancelAnimationFrame(this.rAF);
				this.playIconContainer.classList.remove('play')
				this.playIconContainer.classList.add('pause')
				this.playState = 'play';
			}
		});
		this.seekSlider.addEventListener('input', (e) => {
			this.showRangeProgress(e.target);
			if (!this.audio.paused) {
				cancelAnimationFrame(this.rAF);
			}

		});
		this.seekSlider.addEventListener('change', () => {
			this.audio.currentTime = this.seekSlider.value;
			if (!this.audio.paused) {
				requestAnimationFrame(this.whilePlaying);
			}
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
		this.rAF = requestAnimationFrame(this.whilePlaying);
	}
}
