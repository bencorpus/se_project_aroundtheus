class Card {
  constructor(cardData, cardSelector, handlePreviewClick, handleDeleteClick, userId, handleUserLikes) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._likeButton = this;
    this._deleteButton = this;
    this._cardSelector = cardSelector;
    this._handlePreviewClick = handlePreviewClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardEl;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewClick(this._name, this._link);
      });

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton.addEventListener("click", () => this.togglelikeButton());
    this._deleteButton.addEventListener("click", () => {this._handleDeleteClick(this)});
  }

  togglelikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
    }

  deleteCard() {
    this._element.remove();
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }


}

export default Card;
