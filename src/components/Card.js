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
    this._likes = cardData.likes || [];
    this._likesCount = cardData.likes ? cardData.likes.length : 0;
    this._userId = userId;
    this._likeCountEl = null;
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
    this._likeButton.addEventListener("click", () => this.togglelikeButton());
    this._deleteButton.addEventListener("click", () => {this._handleDeleteClick(this)});
  }

  togglelikeButton() {
    if (this.isLiked()) {
      this._handleUserLikes(this._cardId, false)
        .then((res) => {
          this.setLikes(res.likes);
        })
        .catch((err) => console.log(err));
    } else {
      this._handleUserLikes(this._cardId, true)
        .then((res) => {
          this.setLikes(res.likes);
        })
        .catch((err) => console.log(err));
    }
  }

  deleteCard() {
    this._element.remove();
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._likeCountEl = this._element.querySelector(".card__like-count");
    this._setEventListeners();
    this._updateLikesView();
    return this._element;
  }

  getId() {
    return this._cardId;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  setLikes(likes){
    this._likes = likes || [];
    this._likesCount = this._likes.length;
    this._updateLikesView();
  }

  _updateLikesView() {
    this._likeCountEl.textContent = this._likesCount;
    if (this.isLiked()) {
      this._likeButton.classList.add('card__like-button_active');
    }else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }
}

export default Card;
