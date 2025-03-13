import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithImages from "../components/PopupWithImages.js";

import {
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
} from "../utils/constants.js";

const userInfo = new UserInfo(".profile__title", ".profile__description");
const imagePopup = new PopupWithImages({ modalSelector: "#preview-image-modal"});

profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileTitleInput.value = userData.name;
    profileDescriptionInput.value = userData.job;
});

function handleImageClick(name, link) {
    const cardData = { name, link };
    imagePopup.open(cardData);
}

imagePopup.setEventListeners();

function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleImageClick);
    return card.getView();
}
const section = new Section(
    {
        items: initialCards,
        renderer: renderCard,
    },

    ".cards__list"
);

function renderCard(data) {
    const card = createCard(data);
    section.addItem(card);
}

section.renderItems();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const newData = { name: formData.title, link: formData.url };
    renderCard(newData, cardListEl);
    addCardPopup.close();
    addCardForm.reset();

    addCardFormValidator.disableButton();
});

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
    addCardPopup.open();
});

const editProfileModal = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
        userInfo.setUserInfo({
            name: formData.title,
            description: formData.description,
        });
        editProfileModal.close();
        profileEditForm.reset();
    }
);
editProfileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
    editProfileModal.open();
});

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();