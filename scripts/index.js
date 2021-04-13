const popupProfile = document.querySelector(".popup-edit");
const popupCard = document.querySelector(".popup-card");
const closePopupProfile = document.querySelector(".popup__close-profile");
const closePopupCard = document.querySelector(".popup__close-card");
const closePopupPhoto = document.querySelector(".popup__close-photo");
const openPopupProfile = document.querySelector(".profile__button-edit");
const openPopupCard = document.querySelector(".profile__button-add");
const popupTitle = document.querySelector(".form__item_input_title");
const popupSubtitle = document.querySelector(".form__item_input_subtitle");
const popupPhotoText = document.querySelector(".form__item_input_text");
const popupPhotoPhoto = document.querySelector(".form__item_input_photo");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitle = document.querySelector(".profile__title");
const photoText = document.querySelector(".cards__text");
const photoPhoto = document.querySelector(".cards__photo");
const profileForm = document.getElementById("form-profile");
const addCardForm = document.querySelector(".form-photo");
const popupPict = document.querySelector(".popup__photo");
const popupName = document.querySelector(".popup__text");
const popupPhoto = document.querySelector(".popup-photo");
const popupList = document.querySelectorAll('.popup');
const addSaveCardButton = document.querySelectorAll('.form__button');
const button = document.querySelector('.form__card-button');

//редактирование
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    closePop(popupProfile);
}
profileForm.addEventListener("submit", submitProfileForm);

//общая функция открытия попапа
function openPop(popup) {
    popup.classList.add("popup_open");
  document.addEventListener('keydown', escHandler)
}

//общая функция закрытия попапа
function closePop(popup) {
    popup.classList.remove("popup_open");
  document.removeEventListener('keydown', escHandler);
}

//закрытие попапа по нажатию на оверлей и крестик
popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__close-pic')) {
        closePop(popup)
      }
    })
  })


//Заполнения формы редактировая информацией
function addPopupInfo() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
}

openPopupProfile.addEventListener("click", function () {
    openPop(popupProfile);
    addPopupInfo(popupProfile);
});

openPopupCard.addEventListener("click", function() {
  saveCardButton(button);
  openPop(popupCard);

});

//openPopupPhoto.addEventListener('click', () => openPop(popupPhoto));

const saveCardButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const list = document.querySelector(".cards");
const listItemTemplate = document.querySelector(".list-item-template").content;

function createCard(element) {
    const listItem = listItemTemplate.cloneNode(true);
    const openPopupPhoto = listItem.querySelector(".cards__photo-open");
    listItem.querySelector(".cards__text").textContent = element.name;
    const cardPhoto = listItem.querySelector(".cards__photo");
    cardPhoto.src = element.link;
    cardPhoto.alt = element.name;
    const like = listItem.querySelector(".cards__button-like");
    like.addEventListener("click", likeCardHandler);
    const trashButton = listItem.querySelector(".cards__button-delete");
    trashButton.addEventListener("click", deleteCardHandler);
    openPopupPhoto.addEventListener("click", openPopupPict);
    return listItem;
}

//функция добавления карточек в контейнер
function renderCard(element, list) {
    list.prepend(element);
}

//клонирование карточек
initialCards.forEach((element) => {
    const card = createCard(element);
    renderCard(card, list);
});

//добавление информации о карточке
function addInfoPhoto(evt) {
    evt.preventDefault();
    const element = { name: popupPhotoText.value, link: popupPhotoPhoto.value };
    popupPhotoText.value = "";
    popupPhotoPhoto.value = "";
    const card = createCard(element);
    renderCard(card, list);
    closePop(popupCard);
}

addSaveCardButton.forEach(button =>{
  //button.removeAttribute("disabled");
  button.classList.add(validationConfig.inactiveButtonClass);
})

//лайки
function likeCardHandler(evt) {
    evt.target.classList.toggle("cards__button-like_active");
}

//удаление
function deleteCardHandler(evt) {
    evt.target.closest(".cards__item").remove();
}

//попап фотографии
function openPopupPict(evt) {
    popupPict.src = evt.target.src;
    const parent = evt.target.parentNode;
    const titleElement = parent.querySelector(".cards__text");
    const title = titleElement.textContent;
    popupName.textContent = title;
    popupPict.alt = title;
    openPop(popupPhoto);
}

addCardForm.addEventListener("submit", addInfoPhoto);


//Функция закрытия при нажатии на ESC
const escHandler = (event) => {
    const openPopup = document.querySelector('.popup_open');
    if (event.key === 'Escape') {
      closePop(openPopup);
    }
  }

  
 

  
  


