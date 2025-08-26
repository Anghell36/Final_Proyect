console.log("Welcome!!!");

//Inital data with predefined cards with image and description
const cards = [
  { image: "./images/pic1.gif", description: "pic1" },
  { image: "./images/pic2.png", description: "pic2" },
  { image: "./images/pic3.gif", description: "pic3" },
];

// Principal selectors
const travelerProfileDetails = document.querySelector(".traveler-profile__details");
const travelerProfileName = travelerProfileDetails.querySelector(".traveler-profile__name");
const travelerProfileBio = travelerProfileDetails.querySelector(".traveler-profile__bio");
const travelerProfileEditBtn = document.querySelector(".traveler-profile__edit-btn");
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const placesGalleryList = document.querySelector(".places-gallery__list");
const modalProfile = document.querySelector("#modal-edit-profile");
const modalNewPlace = document.querySelector("#modal-new-place");
const modalImageView = document.querySelector("#modal-image-view");
const modalInputs = Array.from(document.querySelectorAll(".modal__input"));
const modalForms = Array.from(document.querySelectorAll(".modal__form"));
const modalCloseBtns = Array.from(
  document.querySelectorAll(".modal__close-btn")
);

// Form elements to edit the profile
const formEditProfile = document.querySelector("#form-edit-profile");
const profileNameInput = document.querySelector("#traveler-name");
const profileBioInput = document.querySelector("#traveler-bio");

// Form elements to add a new card
const formNewPlace = document.querySelector("#form-new-place");
const placeTitleInput = document.querySelector("#place-title");
const placeImageUrlInput = document.querySelector("#place-image-url");

// Function to close and open the modal
function toggleModal(modal) {
  modal.classList.toggle("modal_is-opened");
}

// Function to close all the modals with a "X" symbol
modalCloseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    toggleModal(modal);
  });
});

// To open modal for edit form and shows the initial information
travelerProfileEditBtn.addEventListener("click", () => {
  profileNameInput.value = travelerProfileName.textContent;
  profileBioInput.value = travelerProfileBio.textContent;
  toggleModal(modalProfile);
});

// Submit and saves changes
formEditProfile.addEventListener("submit", evt => {
  evt.preventDefault();
  travelerProfileName.textContent = profileNameInput.value;
  travelerProfileBio.textContent = profileBioInput.value;
  toggleModal(modalProfile);
});

// Opens the New Place modal to clear inputs, reset errors and then displays the modal
travelerProfileAddPlaceBtn.addEventListener("click", () => {
  formNewPlace.reset();
  toggleModal(modalNewPlace);
});

// Create and add a card element to add to the gallery and close the modal
formNewPlace.addEventListener("submit", evt => {
  evt.preventDefault();
  const newCard = {
    image: placeImageUrlInput.value,
    description: placeTitleInput.value
  };
  createCard(newCard);
  toggleModal(modalNewPlace);
});

// Makes a card form a template with like button, delete button, and view-image event
function createCard(card) {
  const templatePlaceCard = document.querySelector("#template-place-card").content.cloneNode(true);
  const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
  const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");
  const placeCardDeleteButton = templatePlaceCard.querySelector(".place-card__delete-button");
  const placeCardLikeButton = templatePlaceCard.querySelector(".place-card__like-button");

  // set image and title
  placeCardImage.src = card.image;
  placeCardImage.alt = card.description;
  placeCardTitle.textContent = card.description;

  // delete button
  placeCardDeleteButton.addEventListener("click", evt => {
    evt.target.closest(".place-card").remove();
  });

  // like button
  placeCardLikeButton.addEventListener("click", () => {
    placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
  });

  // shows image on a reduce modal
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

// Inserts all the predefined cards into the gallery
cards.forEach(createCard);

// Realtime form validation
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