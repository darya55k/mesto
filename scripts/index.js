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
const profileForm = document.getElementById("form-profile")
const addCardForm = document.querySelector(".form-photo");

const popupPict = document.querySelector(".popup__photo");
const popupName = document.querySelector(".popup__text");
const popupPhoto = document.querySelector(".popup-photo");

const initialCards = [
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

//редактирование
function submitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    closePop(popupProfile);
}
profileForm.addEventListener("submit", submitProfileForm);

//общая функция открытия попапа
function openPop(modal) {
    modal.classList.add("popup_open");
}

function closePop(modal) {
    modal.classList.remove("popup_open");
}

//Заполнения формы редактировая информацией
function addPopupInfo() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
}


openPopupProfile.addEventListener("click", function() {
  openPop(popupProfile);
  addPopupInfo(popupProfile);
});
openPopupCard.addEventListener("click", () => openPop(popupCard));
//openPopupPhoto.addEventListener('click', () => openPop(popupPhoto));

closePopupProfile.addEventListener("click", () => closePop(popupProfile));
closePopupCard.addEventListener("click", () => closePop(popupCard));
closePopupPhoto.addEventListener("click", () => closePop(popupPhoto));

const list = document.querySelector(".list");
const listItemTemplate = document.querySelector(".list-item-template").content;

function createCard(element){
  const listItem = listItemTemplate.cloneNode(true);
  listItem.querySelector(".cards__text").textContent = element.name;
    listItem.querySelector(".cards__photo").src = element.link;
    

  const like = listItem.querySelector(".cards__button-like");
    like.addEventListener("click", likeCardHandler);
    const trashButton = listItem.querySelector(".cards__button-delete");
    trashButton.addEventListener("click", deleteCardHandler);
    const openPopupPhoto = listItem.querySelector(".cards__photo-open");
    openPopupPhoto.addEventListener("click", () => openPop(popupPhoto));

    openPopupPhoto.addEventListener("click", openPopupPict);
    //list.prepend(listItem); 
    
    return listItem;
}

function renderCard(){
    const card = initialCards.map(createCard);
	list.append(...card);
}
renderCard();

    

//клонирование карточек
initialCards.forEach((element) => {
    createCard(element);
});


//добавление информации о карточке
function addInfoPhoto(evt) {
    evt.preventDefault();
    //renderCard();
    const element= {name: popupPhotoText.value, link: popupPhotoPhoto.value};
    createCard(element);

    popupPhotoText.value ='';
    popupPhotoPhoto.value = '';
    //list.prepend(element); 
    renderCard();
    closePop(popupCard);
}

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
}

addCardForm.addEventListener("submit", addInfoPhoto);

//renderCard();
