class Card {
  constructor(cardData, cardSelector, handlePreviewClick, handleDeleteClick, userId, handleUserLikes) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._deleteButton = this;
    this._cardSelector = cardSelector;
    this._handlePreviewClick = handlePreviewClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = cardData.likes || [];
    this._userId = userId;
    this._handleUserLikes = handleUserLikes;
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
    this._likeButton.addEventListener("click", () => this.toggleLikeButton());
    this._deleteButton.addEventListener("click", () => {this._handleDeleteClick(this)});
  }

  toggleLikeButton() {
    const isLiked = this._likeButton.classList.contains("card__like-button_active");
 this._handleUserLikes(this._cardId, !isLiked)
     .then((updatedCard) => {
         this._likes = updatedCard.likes;
         this._likeButton.classList.toggle("card__like-button_active");
    })
    .catch((err) => console.log("Error updating like status:", err))};

  deleteCard(){
    this._element.remove();
  }

  getId(){
    return this._cardId;
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    const hasUserLiked = this._likes.some((user) => user._id === this._userId);
    if (this._likes.some((like) => like._id === this._userId)) {
      this._likeButton.classList.add("card__like-button_active");
    }

    return this._element;
  }

}

export default Card;
