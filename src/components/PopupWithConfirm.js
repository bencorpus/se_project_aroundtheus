import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._submitButton = this._modalForm.querySelector(".modal__button");
    this._submitButtonTextContent = this._submitButton.textContent;
  }

  setSubmitFunc(SubmitFunc) {
    this._SubmitFunc = SubmitFunc;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._SubmitFunc();
    });
  }

  setLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }
}
