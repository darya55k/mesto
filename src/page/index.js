import "./index.css";
import FormValidator from "../components/FormValidator.js";
import {
    popupProfile,
    popupCard,
    openPopupProfile,
    openPopupCard,
    popupTitle,
    popupSubtitle,
    imageAvatar,
    profileSubtitle,
    profileTitle,
    profileForm,
    addCardForm,
    popupPhoto,
    template,
    list,
    validationConfig,
    popupAvatar,
    openPopupAvatar,
    avatarForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const photoFormValidator = new FormValidator(validationConfig, addCardForm);
photoFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

//cardsList.renderCards();

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-24",
    headers: {
        authorization: "165e4d32-519f-4771-b3bb-371d3aa2b234",
        "Content-Type": "application/json",
    },
});

let userId = null;

api.getUserInfo()
    .then((userData) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
    })
    .catch((err) => {
        console.log(err);
    });

const userInfo = new UserInfo({
    userName: profileTitle,
    userDescription: profileSubtitle,
    avatar: imageAvatar,
});

const openEditProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (data) => {
        openEditProfile.renderLoading(true);
        api.updateUserInfo(data)
            .then((data) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                openEditProfile.renderLoading(false);
            });
    },
});
openEditProfile.setEventListeners();

openPopupProfile.addEventListener("click", () => {
    popupTitle.value = userInfo.getUserInfo().userName;
    popupSubtitle.value = userInfo.getUserInfo().userDescription;
    profileFormValidator.toggleButtonState();
    openEditProfile.open();
    profileFormValidator.removeValidationErrors();
});

//отрисовка дефорлтных карточек при загрузке страницы
const cardsList = new Section(
    {
        //items: initialCards,
        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    list
);

function createCard(cardData) {
    const cardExample = new Card(
        { ...cardData, userId },
        template,
        (formData) => {
            popupImage.open(formData);
        },
        (cardData) => {
            popupDeleteCard.open(cardData);
        },
        api
    );
    const card = cardExample.getTemplate();
    return card;
}

api.getInitialCards()
    .then((cards) => {
        cardsList.renderCards(cards);
    })
    .catch((err) => {
        console.log(err);
    });

const popupDeleteCard = new PopupDelete(".popup-delete", (cardData) => {
    api.removeCard(cardData.cardId)
        .then(() => {
            cardData.card.remove();
        })
        .catch((err) => {
            console.log(err);
        });
});
popupDeleteCard.setEventListeners();

const popupAddCard = new PopupWithForm({
    popupSelector: popupCard,
    handleFormSubmit: (formData) => {
        popupAddCard.renderLoading(true);
        api.createCard(formData)
            .then((formData) => {
                cardsList.addItem(createCard(formData));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddCard.renderLoading(false);
            });
    },
});

popupAddCard.setEventListeners();

openPopupCard.addEventListener("click", () => {
    popupAddCard.open();
    photoFormValidator.removeValidationErrors();
});

const popupImage = new PopupWithImage(popupPhoto);
popupImage.setEventListeners();

const popupAddAvatar = new PopupWithForm({
    popupSelector: popupAvatar,
    handleFormSubmit: (formData) => {
        popupAddAvatar.renderLoading(true);
        api.popupAddAvatar(formData)
            .then((formData) => {
                userInfo.setUserInfo(formData);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddAvatar.renderLoading(false);
            });
    },
});

popupAddAvatar.setEventListeners();

openPopupAvatar.addEventListener("click", () => {
    popupAddAvatar.open();
    avatarFormValidator.toggleButtonState();
    avatarFormValidator.removeValidationErrors();
});
