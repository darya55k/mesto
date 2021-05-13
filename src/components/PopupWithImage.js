import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        //this._form = this._popup.querySelector('.popup__container')
        this._popupPict = this._popup.querySelector(".popup__photo");
        this._popupName = this._popup.querySelector(".popup__text");
    }

    open(link, name) {
        this._popupPict.src = link;
        this._popupName.textContent = name;
        this._popupPict.alt = name;
        super.open();
    }
}

