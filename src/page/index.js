import './index.css';
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/cards.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";

const popupProfile = ".popup-edit";
const popupCard = ".popup-card";
//const form = document.querySelector(".form");
const openPopupProfile = document.querySelector(".profile__button-edit");
const openPopupCard = document.querySelector(".profile__button-add");
const popupTitle = document.querySelector(".form__item_input_title");
const popupSubtitle = document.querySelector(".form__item_input_subtitle");
//const popupPhotoText = document.querySelector(".form__item_input_text");
//const popupPhotoPhoto = document.querySelector(".form__item_input_photo");
const profileSubtitle = ".profile__subtitle";
const profileTitle = ".profile__title";
const profileForm = document.getElementById("form-profile");
const addCardForm = document.querySelector(".form-photo");
//const popupPict = document.querySelector(".popup__photo");
//const popupName = document.querySelector(".popup__text");
const popupPhoto = ".popup-photo";
//const popupList = document.querySelectorAll(".popup");
const template = "#newCard";
const list = ".cards";

const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_input_error",
    errorClass: "form__input-error_visible",
};

const createCard = (item) => {
    const card = new Card(item, template, () => popupImage.open(item.link, item.name));
    return card.generateCard();
};

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (items) => {
            cardsList.addItem(createCard(items));
        },
    },
    list
);
const popupImage = new PopupWithImage(popupPhoto);

const popupAddCard = new PopupWithForm({
    popupSelector: popupCard,
    handleFormSubmit: (data) => {
        cardsList.addItem(
            createCard({
                name: data["text"],
                link: data["link"],
            })
        );
        popupAddCard.close();
    },
});

openPopupCard.addEventListener("click", () => {
    addCardForm.reset();
    popupAddCard.open();
    photoFormValidator.removeValidationErrors();
});

const openEditProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (data) => {
        userInfo.setUserInfo({
            userNameValue: data["title"],
            userDescriptionValue: data["subtitle"],
        });
        openEditProfile.close();
    },
});

const userInfo = new UserInfo({
    userName: profileTitle,
    userDescription: profileSubtitle,
});

const getProfileInfo = () => {
    const profileInfo = userInfo.getUserInfo();
    popupTitle.value = profileInfo.name;
    popupSubtitle.value = profileInfo.description;
    profileFormValidator.enableValidation();
    openEditProfile.open();
};
openPopupProfile.addEventListener("click", getProfileInfo);

openEditProfile.setEventListeners();
popupImage.setEventListeners();
popupAddCard.setEventListeners();

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const photoFormValidator = new FormValidator(validationConfig, addCardForm);
photoFormValidator.enableValidation();

cardsList.renderCards();
