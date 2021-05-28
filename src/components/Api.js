export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => this._checkRequestResult(res))
            .catch(error => this._errorHandler(error));
                
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(res => this._checkRequestResult(res))
        .catch(error => this._errorHandler(error));
    }

    updateUserInfo(formData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.title,
                about: formData.subtitle,
            })
        })
        .then(res => this._checkRequestResult(res))
        .catch(error => this._errorHandler(error));
    }

    createCard(formData) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })
        })
        .then(res => this._checkRequestResult(res))
        .catch(error => this._errorHandler(error));
    }

    removeCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => this._checkRequestResult(res))
        .catch(error => this._errorHandler(error));
    }
    setLikeStatus(cardId, like) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: like ? 'DELETE' : 'PUT',
          headers: this._headers,
        })
          .then(res => this._checkRequestResult(res))
          .catch(error => this._errorHandler(error));
      }
    
    

    setAvatar(formData) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData.avatar
            })
        })
        .then(res => this._checkRequestResult(res))
        .catch(error => this._errorHandler(error));
    }

    _checkRequestResult(res) {
        if (res.ok) {
          return res.json(); 
        }
        return Promise.reject(`Возникла ошибка: ${res.status}`); 
      }
    
      _errorHandler(error) {
        console.log(error);
      }
}