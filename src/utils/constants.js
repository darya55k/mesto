export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

export const popupProfile = ".popup-edit";
export const popupCard = ".popup-card";
export const openPopupProfile = document.querySelector(".profile__button-edit");
export const openPopupCard = document.querySelector(".profile__button-add");
export const popupTitle = document.querySelector(".form__item_input_title");
export const popupSubtitle = document.querySelector(".form__item_input_subtitle");
export const profileSubtitle = ".profile__subtitle";
export const profileTitle = ".profile__title";
export const profileForm = document.getElementById("form-profile");
export const addCardForm = document.querySelector(".form-photo");
export const popupPhoto = ".popup-photo";
export const template = "#newCard";
export const list = ".cards";

export const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_input_error",
    errorClass: "form__input-error_visible",
};
