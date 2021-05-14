import './index.css';
import FormValidator from "../components/FormValidator.js";
import { 
    initialCards,
    popupProfile,
    popupCard,
    openPopupProfile,
    openPopupCard,
    popupTitle,
    popupSubtitle,
    profileSubtitle,
    profileTitle,
    profileForm,
    addCardForm,
    popupPhoto,
    template,
    list, 
    validationConfig
 } from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";


const createCard = (item) => {
    const card = new Card(item, template, () => popupImage.open(item.link, item.name));
    return card.generateCard();
};

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            cardsList.addItem(createCard(item));
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
    profileFormValidator.removeValidationErrors();
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
