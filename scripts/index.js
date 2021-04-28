
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";

const popupProfile = document.querySelector(".popup-edit");
const popupCard = document.querySelector(".popup-card");
const form = document.querySelector(".form");
const openPopupProfile = document.querySelector(".profile__button-edit");
const openPopupCard = document.querySelector(".profile__button-add");
const popupTitle = document.querySelector(".form__item_input_title");
const popupSubtitle = document.querySelector(".form__item_input_subtitle");
const popupPhotoText = document.querySelector(".form__item_input_text");
const popupPhotoPhoto = document.querySelector(".form__item_input_photo");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitle = document.querySelector(".profile__title");
const profileForm = document.getElementById("form-profile");
const addCardForm = document.querySelector(".form-photo");
const popupPict = document.querySelector(".popup__photo");
const popupName = document.querySelector(".popup__text");
const popupPhoto = document.querySelector(".popup-photo");
const popupList = document.querySelectorAll(".popup");
const template = "#newCard";
const list = document.querySelector(".cards");

const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_input_error",
    errorClass: "form__input-error_visible",
};

const editFormValidation = new FormValidator(validationConfig, profileForm);
editFormValidation.enableValidation();
const addCardFormValidation = new FormValidator(validationConfig, addCardForm);
addCardFormValidation.enableValidation();

//Рендер карточек "из коробки"
initialCards.forEach((data) => {
    const newCard = createCard(data);
    list.append(newCard);
});

//Функция создания карточек
function createCard(data) {
    const card = new Card(data, template, openPopupPicture);
    const cardElement = card.generateCard();
    return cardElement;
}

//Добавление карточек
function addCard(event) {
    event.preventDefault();
    const newCard = createCard({ name: popupPhotoText.value, link: popupPhotoPhoto.value });
    list.prepend(newCard);
    closePopup(popupCard);
}

addCardForm.addEventListener("submit", addCard);

//редактирование
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    //editFormValidation.removeValidationErrors()
    closePopup(popupProfile);
}
profileForm.addEventListener("submit", submitProfileForm);

//Функция закрытия при нажатии на ESC
const escHandler = (event) => {
    const openPopup = document.querySelector(".popup_open");
    if (event.key === "Escape") {
        closePopup(openPopup);
    }
};

//общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("keydown", escHandler);
}

//общая функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener("keydown", escHandler);
}

//закрытие попапа по нажатию на оверлей и крестик
popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup__overlay") || evt.target.classList.contains("popup__close-pic")) {
            closePopup(popup);
        }
    });
});

//Заполнения формы редактировая информацией
function addPopupInfo() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
}

openPopupProfile.addEventListener("click", function () {
    openPopup(popupProfile);
    addPopupInfo(popupProfile);
    editFormValidation.removeValidationErrors();
});

openPopupCard.addEventListener("click", function () {
    addCardForm.reset();
    addCardFormValidation.removeValidationErrors();
    openPopup(popupCard);
});

//попап фотографии
function openPopupPicture(name, link) {
    popupPict.src = link;
    popupName.textContent = name;
    popupPict.alt = name;
    openPopup(popupPhoto);
}





  
  
