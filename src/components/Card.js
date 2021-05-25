export default class Card {
    constructor(cardData, cardSelector, handleCardClick, popupDelete, api) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likesId = cardData.likes;
        this._likes = cardData.likes.length;
        this._usersId = cardData.owner._id;
        this._cardId = cardData._id;
        this._myId = cardData.userId;
        this._popupDelete = popupDelete;
        this._api = api;
    }

    _likeCardHandler(evt) {
        evt.target.classList.toggle("cards__button-like_active");
    }

    _isLiked() {
        return Boolean(this._likesId.find((obj) => obj._id == this._myId));
    }

    _likedCards(isLiked) {
        if (isLiked) {
            this._element.querySelector(".cards__button-like").classList.add("cards__button-like_active");
        }
    }

    _likeCard() {
        this._api
            .likeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.length;
                this._cardLikes.textContent = this._likes;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _unlikeCard() {
        this._api
            .unLikeCard(this._cardId)
            .then((res) => {
                this._likes = res.likes.length;
                this._cardLikes.textContent = this._likes;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _deleteCardHandler() {
        if (this._usersId !== this._myId) {
            this._element.querySelector(".cards__button-delete").remove();
        }
    }

    _setEventListeners() {
        this._element.querySelector(".cards__button-delete").addEventListener("click", () => {
            this._popupDelete({ cardId: this._cardId, card: this._element });
        });
        this._element.querySelector(".cards__button-like").addEventListener("click", (evt) => {
            const activeLikeButton = this._element.querySelector(".cards__button-like").classList.contains("cards__button-like_active");
            activeLikeButton ? this._unlikeCard() : this._likeCard();
            this._likeCardHandler(evt);
        });

        this._element.querySelector(".cards__photo").addEventListener("click", () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
    }

    getTemplate() {
        this._element = document.querySelector(this._cardSelector).content.querySelector(".cards__item").cloneNode(true);
        const elementsImage = this._element.querySelector(".cards__photo");
        this._setEventListeners();
        this._deleteCardHandler();

        this._element.querySelector(".cards__text").textContent = this._name;
        elementsImage.src = this._link;
        elementsImage.alt = this._name;

        this._cardLikes = this._element.querySelector(".cards__number-likes");
        this._cardLikes.textContent = this._likes;
        this._likedCards(this._isLiked());
        return this._element;
    }
}
