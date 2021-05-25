import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector)
		this._handleFormSubmit = handleFormSubmit
		this._form = this._popup.querySelector('.form')
		this._formInputs = this._popup.querySelectorAll('.form__item')
		this._submitButton = this._popup.querySelector('.form__button');
        this._submitOnLoadButton = this._submitButton.textContent;
	}

	_getInputValues() {
		this._inputValues = {}
		this._formInputs.forEach((input) => {
			this._inputValues[input.name] = input.value
		})

		return this._inputValues
	}

	renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._submitOnLoadButton;
        }
    }

	setEventListeners() {
		super.setEventListeners()
		this._form.addEventListener('submit', (event) => {
			event.preventDefault()
			this._handleFormSubmit(this._getInputValues())
			this._form.reset();
            this.close();
		})
	}

	close() {
		super.close()
		this._form.reset()
	}
}

