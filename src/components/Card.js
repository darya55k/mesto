export default class Card {
  constructor({ data, handleCardClick, handlerDeleteCard, handleLikeClick }, cardSelector, userId) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handlerDeleteCard = handlerDeleteCard;
      this._likes = data.likes;
      this._userId = userId;
      this._cardId = data._id;
      this._currectUser = userId;
      this._ownerId = data.owner._id;
      this._cardLike = handleLikeClick;
  }

  getTemplate() {
      this._element = document.querySelector(this._cardSelector).content.querySelector(".cards__item").cloneNode(true);
      const elementsImage = this._element.querySelector(".cards__photo");
      this._likeButton = this._element.querySelector(".cards__button-like");
      this._deleteCard = this._element.querySelector(".cards__button-delete");
      this._updateLikes();
      this._setEventListeners();
      this._removeTrashElement();
      this._element.querySelector(".cards__text").textContent = this._name;
      elementsImage.src = this._link;
      elementsImage.alt = this._name;
      return this._element;
  }

  _setEventListeners() {
      this._deleteCard.addEventListener("click", () => {
          this._handlerDeleteCard({ cardId: this._cardId, card: this._element });
      });
      this._likeButton.addEventListener("click", () => {
          this._handleLikeClick();
      });

      this._element.querySelector(".cards__photo").addEventListener("click", () => {
          this._handleCardClick({ name: this._name, link: this._link });
      });
  }

  _updateLikes() {
      this._element.querySelector(".cards__number-likes").textContent = this._likes.length;

      if (this.isLiked()) {
          this._likeButton.classList.add("cards__button-like_active");
      } else {
          this._likeButton.classList.remove("cards__button-like_active");
      }
  }

  isLiked() {
      return Boolean(this._likes.find((item) => item._id === this._currectUser));
  }

  likesInfo(data) {
      this._likes = data.likes;
      this._updateLikes();
  }

  _handleLikeClick() {
      this._updateLikes();
      this._cardLike(this._cardId, this.isLiked());
  }

  _removeTrashElement() {
      if (this._ownerId !== this._userId) {
          this._element.querySelector(".cards__button-delete").remove();
      }
  }
}
