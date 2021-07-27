export class Popup {
	constructor(el) {
		this.open = el
		this.popupId = el.dataset?.target
		this.popup = document.getElementById(this.popupId)
		this.close = this?.popup.querySelector('.close-popup')
		this.popupBody = this?.popup.querySelector('.popup-body')
		if (this.popup && this.close) {
			this.attachEventsListeners()
		}
	}

	attachEventsListeners() {
		this.open.addEventListener('click', (evt) => {
			evt.preventDefault()
			this.openPopup(this.popup)
		})
		this.popup.addEventListener('click', (evt) => {
			evt.preventDefault()
			const clicked = evt.target
			if (clicked.classList.contains('open-popup')) return
			if (!this.popupBody.contains(clicked) && document.body.classList.contains('modal-open')) {
				this.closePopup()
			}
		})

		this.close.addEventListener('click', (e) => {
			e.preventDefault()
			this.closePopup()
		})
	}

	closePopup() {
		this.popup.classList.add('popup_hide')
		this.popup.classList.remove('popup_open')
		setTimeout(() => {
			document.body.classList.remove('modal-open')
		}, 300)
	}

	openPopup() {
		this.popup.classList.remove('popup_hide')
		this.popup.classList.add('popup_open')
		document.body.classList.add('modal-open')
	}
}