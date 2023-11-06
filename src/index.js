import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF1zJ1GlT5MNcwXnLR-fCTR6RYUKpv8E0",
  authDomain: "n315-matspark.firebaseapp.com",
  projectId: "n315-matspark",
  storageBucket: "n315-matspark.appspot.com",
  messagingSenderId: "433038809376",
  appId: "1:433038809376:web:9e60aa02eec927b7231f45",
  measurementId: "G-T0SXRYDX9P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function initListeners() {
  $(window).on("hashchange", getPage);
  getPage();
}

$(document).on("click", ".signOut", function (e) {
  signOut(auth)
    .then(() => {
      console.log("Signed out");
      $(".login").removeClass("signOut");
      $(".login").html("Login");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

$(document).on("click", "#signIn", function (e) {
  e.preventDefault();
  let email = $("#email").val();
  let pw = $("#pw").val();
  signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      $(".login").addClass("signOut");
      $(".login").html("Logout");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

$(document).on("click", "#createAcctBtn", function (e) {
  console.log("clicked");
  e.preventDefault();
  let emailSignUp = $("#emailSignUp").val();
  let pwSignUp = $("#pwSignUp").val();
  createUserWithEmailAndPassword(auth, emailSignUp, pwSignUp)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      $(".login").addClass(".signOut");
      $(".login").html("Logout");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

function getPage() {
  let hash = window.location.hash;
  let pageID = hash.replace("#", "");

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  }
}

$(".hamburger-icon").on("click", () => {
  $(".hamburger-icon").toggleClass("open");
  $("body").toggleClass("mobile-overflow");
});

$(document).ready(function () {
  initListeners();
});
