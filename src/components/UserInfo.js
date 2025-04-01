export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
      this._nameElement = document.querySelector(nameSelector);
      this._descriptionElement = document.querySelector(descriptionSelector);
      this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
      return {
          name: this._nameElement.textContent,
          job: this._descriptionElement.textContent,
      };
  }

  setUserInfo({ name, description }) {
      this._nameElement.textContent = name;
      this._descriptionElement.textContent = description;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
}
}