
let popup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-icon')
let openPopupBtn =document.getElementById('open_popup_btn');
let popupTitle = document.querySelector('.form__item-title');
let popupSubtitle = document.querySelector('.form__item-subtitle');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileTitle = document.querySelector('.profile__title');
let formElement = document.querySelector('.form__content');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    closePopup();
    
}
formElement.addEventListener('submit', formSubmitHandler);

function openPopup(){
    popup.classList.add('popup_open');
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
}

openPopupBtn.addEventListener('click', function() {
    openPopup();
});

function closePopup(){
    popup.classList.remove('popup_open');
}

closePopupBtn.addEventListener('click', function() {
    closePopup();
});

