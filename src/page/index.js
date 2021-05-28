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
    popupDelete,
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

let userId = null;

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
                openEditProfile.close();
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

function createCard(item) {
    const cardExample = new Card(
        {
            data: item,
            handleCardClick: (link, name) => {
                popupImage.open(link, name);
            },
            handlerDeleteCard: (cardItem, cardId) => {
                popupDeleteCard.open(cardItem, cardId);
            },
            handleLikeClick: (cardId, like) => {
                api.setLikeStatus(cardId, like).then((card) => {
                    cardExample.likesInfo(card);
                });
            },
        },
        template,
        userId
    );
    const cardElement = cardExample.getTemplate();
    return cardElement;
}

const popupDeleteCard = new PopupDelete(popupDelete, (cardItem) => {
    api.removeCard(cardItem.cardId)
        .then(() => {
            cardItem.card.remove();
            popupDeleteCard.close();
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
                popupAddCard.close();
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

const setAvatar = new PopupWithForm({
    popupSelector: popupAvatar,
    handleFormSubmit: (formData) => {
        setAvatar.renderLoading(true);
        api.setAvatar(formData)
            .then((formData) => {
                userInfo.setUserInfo(formData);
                setAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setAvatar.renderLoading(false);
            });
    },
});

setAvatar.setEventListeners();

openPopupAvatar.addEventListener("click", () => {
    setAvatar.open();
    avatarFormValidator.toggleButtonState();
    avatarFormValidator.removeValidationErrors();
});

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-24",
    headers: {
        authorization: "165e4d32-519f-4771-b3bb-371d3aa2b234",
        "Content-Type": "application/json",
    },
});

const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
    .then(([userData, cardData]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardsList.renderCards(cardData.reverse());
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
