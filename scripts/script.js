console.log("Welcome!!!");


const cards = [
  { image: "./images/pic1.gif", description: "pic1" },
  { image: "./images/pic2.png", description: "pic2" },
  { image: "./images/pic3.gif", description: "pic3" },
];

// 2. Selectores principales
const travelerProfileDetails = document.querySelector(".traveler-profile__details");
const travelerProfileName = travelerProfileDetails.querySelector(".traveler-profile__name");
const travelerProfileBio = travelerProfileDetails.querySelector(".traveler-profile__bio");
const travelerProfileEditBtn = document.querySelector(".traveler-profile__edit-btn");
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const placesGalleryList = document.querySelector(".places-gallery__list");

const modalProfile = document.querySelector("#modal-edit-profile");
const modalNewPlace = document.querySelector("#modal-new-place");
const modalImageView = document.querySelector("#modal-image-view");

const modalCloseBtns = Array.from(
  document.querySelectorAll(".modal__close-btn")
);

const modalInputs = Array.from(document.querySelectorAll(".modal__input"));
const modalForms = Array.from(document.querySelectorAll(".modal__form"));

// 3. Elementos del formulario “Editar perfil”
const formEditProfile = document.querySelector("#form-edit-profile");
const profileNameInput = document.querySelector("#traveler-name");
const profileBioInput = document.querySelector("#traveler-bio");

// 4. Elementos del formulario “Nuevo lugar”
const formNewPlace = document.querySelector("#form-new-place");
const placeTitleInput = document.querySelector("#place-title");
const placeImageUrlInput = document.querySelector("#place-image-url");

// 5. Función para abrir/cerrar un modal
function toggleModal(modal) {
  modal.classList.toggle("modal_is-opened");
}

// 6. Cerrar todos los modales con sus botones “X”
modalCloseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    toggleModal(modal);
  });
});

// 7. Abrir modal “Editar perfil” y precargar valores
travelerProfileEditBtn.addEventListener("click", () => {
  profileNameInput.value = travelerProfileName.textContent;
  profileBioInput.value = travelerProfileBio.textContent;
  toggleModal(modalProfile);
});

// 8. Guardar cambios de perfil
formEditProfile.addEventListener("submit", evt => {
  evt.preventDefault();
  travelerProfileName.textContent = profileNameInput.value;
  travelerProfileBio.textContent = profileBioInput.value;
  toggleModal(modalProfile);
});

// 9. Abrir modal “Nuevo lugar” y resetear formulario
travelerProfileAddPlaceBtn.addEventListener("click", () => {
  formNewPlace.reset();
  toggleModal(modalNewPlace);
});

// 10. Crear y agregar nueva card
formNewPlace.addEventListener("submit", evt => {
  evt.preventDefault();
  const newCard = {
    image: placeImageUrlInput.value,
    description: placeTitleInput.value
  };
  createCard(newCard);
  toggleModal(modalNewPlace);
});

// 11. Función para renderizar cada tarjeta
function createCard(card) {
  const templatePlaceCard = document.querySelector("#template-place-card").content.cloneNode(true);
  const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
  const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");
  const placeCardDeleteButton = templatePlaceCard.querySelector(".place-card__delete-button");
  const placeCardLikeButton = templatePlaceCard.querySelector(".place-card__like-button");

  // poblar datos
  placeCardImage.src = card.image;
  placeCardImage.alt = card.description;
  placeCardTitle.textContent = card.description;

  // eliminar tarjeta
  placeCardDeleteButton.addEventListener("click", evt => {
    evt.target.closest(".place-card").remove();
  });

  // like/unlike
  placeCardLikeButton.addEventListener("click", () => {
    placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
  });

  // ver imagen en modal reducido
  placeCardImage.addEventListener("click", () => {
    modalImageView.classList.add("modal_is-opened");
    const modalImage = modalImageView.querySelector(".modal__image");
    const modalCaption = modalImageView.querySelector(".modal__caption");

    modalImage.src = placeCardImage.src;
    modalImage.alt = placeCardImage.alt;
    modalCaption.textContent = placeCardTitle.textContent;
  });

  placesGalleryList.appendChild(templatePlaceCard);
}

// 12. Render inicial de las cards
cards.forEach(createCard);

// 13. Validación en tiempo real de formularios
modalForms.forEach(modalForm => {
  modalInputs.forEach(input => {
    input.addEventListener("input", () => {
      const modalError = modalForm.querySelector("#" + input.id + "-error");
      if (!input.validity.valid) {
        modalError.textContent = "Hay un error";
        modalError.classList.add("modal__error_visible");
      } else {
        modalError.textContent = "";
        modalError.classList.remove("modal__error_visible");
      }
    });
  });
});


travelerProfileName.textContent = "Mick Gordon";