import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5G2h69LbRRVNkJDfxcPNVlexeljLQ92s",
    authDomain: "hospital-eb801.firebaseapp.com",
    projectId: "hospital-eb801",
    storageBucket: "hospital-eb801.appspot.com",
    messagingSenderId: "446594028732",
    appId: "1:446594028732:web:67bc78836a7d31ced82cb9",
    measurementId: "G-67H5V7L3R2",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// #get ref to database service
//   firebaseDb
export const db = getFirestore();


document.getElementById("submitButton").addEventListener("click", async function (e) {
        e.preventDefault();
        let RegexNumber =
            /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
        let RegexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        let username = document.getElementById("name").value;
        let mobile = document.getElementById("number").value;
        let email = document.getElementById("email").value;
        let dob = document.getElementById("date").value;
        let hasError = false;

        if (username === "") {
            checkError("nameError", "Please Enter Name");
            hasError = true;
        } else {
            checkError("nameError", " ");
        }

        if (mobile === "") {
            checkError("numberError", "Please Enter Number");
            hasError = true;
        } else if (RegexNumber.test(mobile) == false) {
            checkError("numberError", "Invalid Number");
            hasError = true;
        } else {
            checkError("numberError", "");
        }

        if (email === "") {
            checkError("emailError", "Please Enter email");
            hasError = true;
        } else if (RegexEmail.test(email) == false) {
            checkError("emailError", "Invalid Email");
            hasError = true;
        } else {
            checkError("emailError", "");
        }

        if (dob === "") {
            checkError("dateError", "Please Enter Date of Birth");
            hasError = true;
        } else {
            checkError("dateError", "");
        }

        // Get form data
        if (hasError) return;
        const formData = {
            name: username,
            mobile: mobile,
            email: email,
            bookingDate: dob,
        };

        // Add a document to the "AppointmentQueries" collection in Firestore
        try {
            const docRef = await addDoc(
                collection(db, "AppointmentQueries"),
                formData
            );
            popupanimation("Booking Succesfull", "success");
        } catch (error) {
            console.error("Error adding document: ", error);
            popupanimation("Error", "error");
        }
        document.getElementById("bookNow").reset();
    });

// Checking Error
function checkError(id, error) {
    error != ""
        ? (document.getElementById(id).innerHTML = error)
        : (document.getElementById(id).innerHTML = "");
}

const TOASTER_TYPE = {
    ERROR: "error",
    SUCCESS: "success",
};

function popupanimation(message, type) {
    const toasterContainer = document.createElement("div");
    toasterContainer.classList = "toastercontainer";

    let icon;
    if (type == TOASTER_TYPE.ERROR) {
        icon = ' fa-circle-exclamation"';
    } else if (type == TOASTER_TYPE.SUCCESS) {
        icon = " fa-circle-check";
    }

    let toastify = `<div class="toasterbox">
              <p class="toastercontent">${message}</p>
              <i class=" fa-solid ${icon}"></i>
          </div>
          <p class="loadingtoaster"></p>
          `;
    document.body
        .appendChild(toasterContainer)
        .insertAdjacentHTML("afterbegin", toastify);

    //passing error css
    if (type == TOASTER_TYPE.ERROR) {
        document.querySelector(".toastercontainer").style.top = "20% ";
        document.querySelector(".toastercontainer").style.bottom = "inherit ";
        document.querySelector(".toastercontainer").style.background = "red";
        document.querySelector(".fa-circle-exclamation").style.color =
            "black";
        document.querySelector(".loadingtoaster").style.background = "none";
    }

    setTimeout(() => {
        document.querySelector(".toastercontainer").style.animation =
            "slide-out .1s linear alternate";
    }, 3000);
    setTimeout(() => {
        toasterContainer.remove();
    }, 4000);
}
