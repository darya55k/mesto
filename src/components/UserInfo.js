export default class UserInfo {
    constructor({userName, userDescription, avatar} ) {
      this._userName = userName;
      this._userDescription = userDescription;
      this._avatar = avatar;
    }
  
    getUserInfo() {
      return {
        userName: this._userName.textContent,
        userDescription: this._userDescription.textContent,
        avatar: this._avatar.src
      }
    }
  
    setUserInfo(data) {
      if(data.name) {this._userName.textContent = data.name};
      if(data.about){this._userDescription.textContent = data.about};
      if(data.avatar){this._avatar.src = data.avatar};
    }
  }