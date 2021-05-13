export default class Popup {
    constructor(popupSelector) {
      this._popup =  document.querySelector(popupSelector)
      this.close = this.close.bind(this);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open() {
		this._popup.classList.add('popup_open')
		document.addEventListener('keydown', this._handleEscClose)
	}

	close() {
		this._popup.classList.remove('popup_open')
		document.removeEventListener('keydown', this._handleEscClose)
	}

	_handleEscClose(event) {
		if (event.key === 'Escape') {
			this.close()
		}
	}

	setEventListeners() {
		this._popup.addEventListener('mousedown', (event) => {
			if (event.target.classList.contains('popup__overlay') || event.target.classList.contains('popup__close-pic')) {
				this.close()
			}
		})
	}
}

