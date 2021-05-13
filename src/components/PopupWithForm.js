import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector)
		this._handleFormSubmit = handleFormSubmit
		this._form = this._popup.querySelector('.form')
		this._formInputs = this._popup.querySelectorAll('.form__item')
	}

	_getInputValues() {
		this._inputValues = {}
		this._formInputs.forEach(input => {
			this._inputValues[input.name] = input.value
		})

		return this._inputValues
	}

	setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (event) => {
			event.preventDefault()
			this._handleFormSubmit(this._getInputValues())
		})
	}

	close() {
		super.close()
		this._form.reset()
        this._form.removeEventListener('submit', this._handleFormSubmit)
	}
}

