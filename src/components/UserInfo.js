export default class UserInfo {
    constructor({userName, userDescription, avatar} ) {
      this._userName = userName;
      this._userDescription = userDescription;
      this._avatar = avatar;
    }
  
    getUserInfo() {
      return {
        userName: this._userName.textContent,
        userDescription: this._userDescription.textContent
      }
    }
  
    setUserInfo(data) {
      this._userName.textContent = data.name;
      this._userDescription.textContent = data.about;
      this._avatar.src = data.avatar;
    }
  }