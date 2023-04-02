const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formDataRadio = document.querySelectorAll(".formDataRadio");
const close = document.querySelector(".close");
const closeconfi = document.getElementById("closeconfi");
const form = document.getElementById("userForm");
const userFirstName = document.getElementById("first");
const userLastName = document.getElementById("last");
const userEmail = document.getElementById("email");
const userBirth = document.getElementById("birthdate");
const userQuantity = document.getElementById("quantity");
const userCheckbox1 = document.getElementById("checkbox1");
const userCheckbox2 = document.getElementById("checkbox2");
const obj_length = document.querySelectorAll("input[name=location]");
const errorRadio = document.getElementById("errorFormDataRadio");
const validate = document.querySelector(".validate");
const confirmation = document.querySelector(".confirmation");

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// fermer la modale
close.addEventListener("click", (e) => {
  modalbg.style.display = "none";
});

closeconfi.addEventListener("click", (e) => {
  modalbg.style.display = "none";
});

// Implémenter entrées du formulaire
// (1) Lier les labels aux entrées dans le HTML en utilisant les attributs "for" et "id" dans le code existant. Corriger le code HTML quand nécessaire.
// (2) Utiliser du JavaScript pur (pas de jQuery) pour terminer le formulaire :

// Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
// Les données doivent être saisies correctement :
// (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
// (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
// (3) L'adresse électronique est valide.
// (4) Pour le nombre de concours, une valeur numérique est saisie.
// (5) Un bouton radio est sélectionné.
// (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
// Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

// Ajouter validation ou messages d'erreur
// Des messages d'erreur spécifiques doivent apparaître sous l'entrée qui n'est pas correcte. Les messages d'erreur doivent s'afficher sous le champ de saisie associé. Exemples :

// "Veuillez entrer 2 caractères ou plus pour le champ du nom."
// "Vous devez choisir une option."
// "Vous devez vérifier que vous acceptez les termes et conditions."
// "Vous devez entrer votre date de naissance."

let resultRadioValue = "";

function validateForm() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
    radioFunc();

    const infoClient = {
      contact: {
        firstName: userFirstName.value,
        lastName: userLastName.value,
        email: userEmail.value,
        birthDay: userBirth.value,
        quantityEnter: userQuantity.value,
        cityInscris: resultRadioValue,
        pubEmail: userCheckbox2.checked,
      },
    };

    if (
      userFirstName.value !== "" &&
      userLastName.value !== "" &&
      userEmail.value !== "" &&
      userBirth.value !== "" &&
      userQuantity.value !== "" &&
      resultRadioValue !== ""
    ) {
      if (userCheckbox1.checked === true) {
        const data = JSON.stringify(infoClient);
        window.localStorage.setItem("inscris", data);

        validate.style.display = "none";

        // Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")
        confirmation.style.display = "flex";
      }
    }
  });

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const isValidName = (name) => {
    const re = /^[a-zA-Z]*$/;
    return re.test(String(name).toLowerCase());
  };

  const validateInputs = () => {
    const userFirstNameValue = userFirstName.value.trim();
    const userLastNameValue = userLastName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const userBirthValue = userBirth.value.trim();
    const userQuantityValue = userQuantity.value.trim();
    const userCheckbox1Value = userCheckbox1.checked;

    if (userFirstNameValue === "") {
      setError(
        userFirstName,
        "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
      );
    } else if (!isValidName(userFirstNameValue)) {
      setError(userFirstName, "Provide a valid FirstName");
    } else {
      setSuccess(userFirstName);
    }
    if (userLastNameValue === "") {
      setError(
        userLastName,
        "Veuillez entrer 2 caractères ou plus pour le champ du nom."
      );
    } else if (!isValidName(userLastNameValue)) {
      setError(userLastName, "Provide a valid LastName");
    } else {
      setSuccess(userLastName);
    }
    if (userEmailValue === "") {
      setError(userEmail, "Email is required");
    } else if (!isValidEmail(userEmailValue)) {
      setError(userEmail, "Provide a valid email address");
    } else {
      setSuccess(userEmail);
    }
    if (userBirthValue === "") {
      setError(userBirth, "Vous devez entrer votre date de naissance.");
    } else {
      setSuccess(userBirth);
    }
    if (userQuantityValue === "") {
      setError(
        userQuantity,
        "À combien de tournois GameOn avez-vous déjà participé ?"
      );
    } else {
      setSuccess(userQuantity);
    }
    if (userCheckbox1Value === false) {
      setError(
        userCheckbox1,
        "Vous devez vérifier que vous acceptez les termes et conditions."
      );
    } else {
      setSuccess(userCheckbox1);
    }
  };

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  };
  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };
}
validateForm();

function radioFunc() {
  let isChecked = false;
  let arr = [];

  const message = "Vous devez choisir une option";
  const notMessage = "";

  for (i = 0; i < obj_length.length; i++) {
    arr.push(obj_length[i].checked);

    if (obj_length[i].checked) {
      resultRadioValue = obj_length[i].value;
    }
  }

  if (arr.includes(true) === isChecked) {
    errorRadio.innerHTML = message;
  } else {
    errorRadio.innerHTML = notMessage;
  }
}
