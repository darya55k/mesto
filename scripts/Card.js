

export class Card {
  constructor(cardData, cardSelector, openPopupPicture){
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._openPopupPicture = openPopupPicture;
    //this._like = this._element.querySelector('.cards__button-like');

  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.cards__item')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementsImage =   this._element.querySelector('.cards__photo');
    this._element.querySelector('.cards__text').textContent = this._name;
    elementsImage.alt = this._name;
    elementsImage.src = this._link;
    return this._element;
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.cards__button-like')
    this._like.addEventListener('click', () => {
      this._likeCardHandler();
    })
    this._element.querySelector('.cards__button-delete').addEventListener('click', ()=> {
      this._deleteCardHandler();
    })
    
    this._element.querySelector('.cards__photo').addEventListener('click', () => 
      this._openPopupPicture(this._name, this._link));
    
  }

  _likeCardHandler() {
    this._like.classList.toggle('cards__button-like_active');
  }

  _deleteCardHandler() {
    this._element.remove();
  }

}
