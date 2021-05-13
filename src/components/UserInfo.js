export default class UserInfo {
    constructor({userName, userDescription} ) {
      this._name = document.querySelector(userName);
      this._description = document.querySelector(userDescription);
    }
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        description: this._description.textContent
      }
    }
  
    setUserInfo({userNameValue, userDescriptionValue}) {
      this._name.textContent = userNameValue;
      this._description.textContent = userDescriptionValue;
    }
  }