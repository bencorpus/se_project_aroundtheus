// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, {inputErrorClass}) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classlist.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classlist.add(errorClass)
}

function hideInputError(formEl, inputEl, {inputErrorClass}) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classlist.remove(inputErrorClass);
  errorMessageEl.textContent = '';
  errorMessageEl.classlist.remove(errorClass)
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
    hideInputError(formEl, inputEl, options);
  }


function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector('.modal__button-save')
  inputEls.forEach(inputEl => {
    inputEl,addEventListener('input', (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
});
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid)
}

//disableButton

function disableButton(submitButton, inactiveButtonClass){
  submitButton.classlist.add(inactiveButtonClass);
  submitButton.disabled = true;
}

//enableButton

function enableButton(submitButton, inactiveButtonClass){
  submitButton.classlist.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
  if(hasInvalidInput(inputEls)) {
    submitButton.classlist.add(inactiveButtonClass);
    return submitButton.disabled = true;
  }
    submitButton.classlist.remove(inactiveButtonClass);
    returnsubmitButton.disabled = false;
  }


function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
    //look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // we want to grab the validation msg and add error msg to input
    // display error msg
    // disable button
    // if all inputs are valid
    // enable button
    // reset error msg
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config)