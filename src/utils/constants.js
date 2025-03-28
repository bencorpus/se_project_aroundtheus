export {
  settings,
  initialCards,
  profileEditButton,
  profileEditModal,
  profileModalCloseButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardButton,
  addCardModal,
  addImageCloseButton,
  addCardTitle,
  addCardURL,
  addCardTitleInput,
  addCardURLInput,
  cardListEl,
  addCardForm,
  imageModal,
  imageModalImg,
  imageModalText,
  imageModalCloseButton,
  avatarEditButton,
  avatarEditForm,
};

const initialCards = [
  {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const avatarEditButton = document.querySelector(".profile__image-edit");
const avatarEditForm = document.querySelector("#avatar-edit-modal");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addImageCloseButton = document.querySelector("#add-image-close-button");
const addCardTitle = document.querySelector(".modal__input_type_title");
const addCardURL = document.querySelector(".modal__input_type_url");
const addCardTitleInput = document.querySelector("#image-title-input");
const addCardURLInput = document.querySelector("#image-description-input");
const cardListEl = document.querySelector(".cards__list");
const addCardForm = addCardModal.querySelector(".modal__form");

const imageModal = document.querySelector("#card-image-modal");
const imageModalImg = document.querySelector(".modal__image");
const imageModalText = document.querySelector(".modal__description");
const imageModalCloseButton = document.querySelector(
  "#image-modal-close-button"
);

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};