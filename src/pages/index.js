import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";
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
  avatarEditButton,
  avatarEditForm,
} from "../utils/constants.js";

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

const imagePopup = new PopupWithImage({ modalSelector: "#preview-image-modal" });

function handleImageClick(name, link) {
  const cardData = { name, link };
  imagePopup.open(cardData);
}

function handleDeleteCard(card) {
  deleteCardPopup.setSubmitFunc(() => {
   api.deleteCard(card.getId())
     .then(() => {
       card.deleteCard();
       deleteCardPopup.close();
     })
     .catch((err) => {
       console.log(`An error occurred while trying to delete the card: ${err}`);
     });
  });
  deleteCardPopup.open();
  }

imagePopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      _id: cardData._id,
      likes: cardData.likes,
    },
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    userInfo.getUserId(),
    handleUserLikes,
  );
  return card.getView();
}

function handleLikeClick(card) {
  const isLiked = card.isLiked();
  api
    .changeCardLikeStatus(card._cardId, isLiked)
    .then((updatedCard) => {
      card.setLikes(updatedCard.likes);
    })
    .catch((err) => {
      console.error(
        `An error occurred while trying to update the like status: ${err}`
      );
    });
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

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  addCardPopup.setLoading(true);
  const newData = { name: formData.title, link: formData.url };
  api
    .createNewCard(newData)
    .then((result) => {
      renderCard(result);
      addCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.setLoading(false);
    });
});

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    editProfileModal.setLoading(true);
    api
      .setProfileInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((result) => {
        userInfo.setUserInfo({
          name: result.name,
          description: result.about,
        });
        profileEditForm.reset();
        editProfileModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        editProfileModal.setLoading(false);
      });
  }
);

const deleteCardPopup = new PopupWithConfirm({ modalSelector: "#delete-card-modal" });

deleteCardPopup.setEventListeners();

editProfileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  editProfileModal.open();
});

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  console.log("Edit button clicked")
  const userData = userInfo.getUserInfo();
  console.log("userData:", userData);
  profileTitleInput.value = userData.name; profileDescriptionInput.value = userData.job;
  console.log("Input values:", profileTitleInput.value, profileDescriptionInput.value);
  editProfileModal.open();
});

const editProfileFormValidator = new FormValidator(settings, profileEditForm);
editProfileFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(settings, avatarEditForm);
avatarEditFormValidator.enableValidation();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "adf20b83-7f1d-480d-901e-a1cb3edace17",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cardsData) => {
    section.renderItems(cardsData);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      description: result.about,
    });
    userInfo.setUserId(result._id);
  })
  .catch((err) => {
    console.error(err);
  });

const avatarEditModal = new PopupWithForm("#avatar-edit-modal", (formData) => {
  avatarEditModal.setLoading(true);
  api
    .setAvatar(formData.avatar)
    .then((result) => {
      userInfo.setAvatar(result.avatar);
      avatarEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarEditModal.setLoading(false);
    });
});

avatarEditModal.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  avatarEditModal.open();
});

function handleUserLikes(cardId, like) {
  return api.changeCardLikeStatus(cardId, like);
  }
