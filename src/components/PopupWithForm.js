import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(modalSelector, handleFormSubmit) {
        super({ modalSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._modalElement.querySelector(".modal__form");
        this._submitButton = this._form.querySelector(".modal__button-save");
        this._submitButtonTextContent = this._submitButton.textContent;
    }

    _getInputValues() {
        this._inputList = this._modalElement.querySelectorAll(".modal__input");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })}}