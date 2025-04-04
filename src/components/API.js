export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
      }).then(this._handleServerResponse);
  }

  createNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              link: data.link,
          }),
      }).then(this._handleServerResponse);
  }

  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
      }).then(this._handleServerResponse);
  }

  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: this._headers,
      }).then(this._handleServerResponse);
  }

  setProfileInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
              name: name,
              about: about,
          }),
      }).then(this._handleServerResponse);
  }

  getAppInfo() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  changeCardLikeStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: isLiked ? "DELETE" : "PUT",
          headers: this._headers,
      }).then((res) => this._handleServerResponse(res));
  }

  setAvatar(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
              avatar: link,
          }),
      }).then(this._handleServerResponse);
  }

  _handleServerResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
  }
}