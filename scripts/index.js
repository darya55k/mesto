const popup = document.querySelector('.popup-edit');
const popupProfile = document.querySelector('.popup-profile');
const closePopupBtn = document.querySelector('.popup__close-profile')
const closePopupProfile = document.querySelector('.popup__close-card');
const closePopupPhoto = document.querySelector('.popup__close-photo');
const openPopupBtn =document.querySelector('.profile__button-edit');
const openPopupProfile = document.querySelector('.profile__button-add');
const popupTitle = document.querySelector('.form__item_input_title');
const popupSubtitle = document.querySelector('.form__item_input_subtitle');
const popupPhotoText = document.querySelector('.form__item_input_text');
const popupPhotoPhoto = document.querySelector('.form__item_input_photo');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitle = document.querySelector('.profile__title');
const photoText = document.querySelector('.cards__text');
const photoPhoto = document.querySelector('.cards__photo');
const formElement = document.querySelector('.form');
const formElem = document.querySelector('.form-photo');

const popupPict = document.querySelector('.popup__photo');
const popupName = document.querySelector('.popup__text');
const popupPhoto = document.querySelector('.popup-photo');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//редактирование
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    closePop(popup);
    
}
formElement.addEventListener('submit', formSubmitHandler);

//общая функция открытия попапа
function openPop(modal){
  modal.classList.add('popup_open');
}

function closePop(modal){
  modal.classList.remove('popup_open')
}

//Заполнения формы редактировая информацией
function addPopupInfo(){
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
}
addPopupInfo(popup);

openPopupBtn.addEventListener('click', () => openPop(popup));
openPopupProfile.addEventListener('click', () => openPop(popupProfile));
//openPopupPhoto.addEventListener('click', () => openPop(popupPhoto));


closePopupBtn.addEventListener('click', () => closePop(popup));
closePopupProfile.addEventListener('click', () => closePop(popupProfile));
closePopupPhoto.addEventListener('click', () => closePop(popupPhoto));

  const list = document.querySelector('.list');
  const listItemTemplate = document.querySelector('.list-item-template').content;

//клонирование карточек
  initialCards.forEach(element =>{
  const listItem = listItemTemplate.cloneNode(true);
  listItem.querySelector('.cards__text').textContent = element.name;
  listItem.querySelector('.cards__photo').src = element.link;
  
  const like = listItem.querySelector('.cards__button-like');
  like.addEventListener('click', likeCardHandler);
  const trashButton = listItem.querySelector('.cards__button-delete');
trashButton.addEventListener('click', deleteCardHandler);
const openPopupPhoto = listItem.querySelector('.cards__photo-open');
openPopupPhoto.addEventListener('click', () => openPop(popupPhoto));
formElem.addEventListener('submit', addInfoPhoto);

openPopupPhoto.addEventListener('click', openPopupPict);

list.append(listItem);
  });
  
//добавление информации о карточке
  function addInfoPhoto(evt) {
    evt.preventDefault();
    const listItem = listItemTemplate.cloneNode(true);
    listItem.querySelector('.cards__text').textContent = popupPhotoText.value;
    listItem.querySelector('.cards__photo').src =popupPhotoPhoto.value;
    const like = listItem.querySelector('.cards__button-like');
    like.addEventListener('click', likeCardHandler);
    const openPopupPhoto = listItem.querySelector('.cards__photo-open');
    openPopupPhoto.addEventListener('click', () => openPop(popupPhoto));
    const trashButton = listItem.querySelector('.cards__button-delete');
    trashButton.addEventListener('click', deleteCardHandler);
    openPopupPhoto.addEventListener('click', openPopupPict);
    list.prepend(listItem);
    closePop(popupProfile);
  }
  
  //лайки
  function likeCardHandler(evt) {
    evt.target.classList.toggle('cards__button-like_active');
}

//удаление
function deleteCardHandler(evt) {
  evt.target.closest('.cards__item').remove();
}


//попап фотографии
function openPopupPict(evt){
  popupPict.src = evt.target.src;
  const parent = evt.target.parentNode;
  const titleElement = parent.querySelector('.cards__text');
  const title = titleElement.textContent;
  popupName.textContent = title;

}




