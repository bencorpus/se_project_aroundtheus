export default class Popup {
  constructor({ modalSelector }) {
      this._modalElement = document.querySelector(modalSelector);
  }

  open(modal) {
      this._modalElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
      this._modalElement.addEventListener("click", this._handleCloseOverlay);
  }

  close(modal) {
      this._modalElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
      this._modalElement.removeEventListener(
          "click",
          this._handleCloseOverlay
      );
  }

  _handleEscClose = (e) => {
      if (e.key === "Escape") {
          this.close();
      }
  };

  _handleCloseOverlay = (e) => {
      if (e.target.classList.contains("modal_opened")) {
          this.close();
      }
  };

  setEventListeners() {
      this._modalElement
          .querySelector(".modal__close")
          .addEventListener("click", () => {
              this.close();
          });
  }
}