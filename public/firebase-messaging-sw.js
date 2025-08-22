// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAbUA738bCnZRCVgnEhSKS_oE_4Rmx91Lk",
  authDomain: "meditourglobal-ea15d.firebaseapp.com",
  projectId: "meditourglobal-ea15d",
  storageBucket: "meditourglobal-ea15d.appspot.com",
  messagingSenderId: "975483364699",
  appId: "1:975483364699:web:d9eb154bab34809e1fe67e",
  measurementId: "G-NJX7T10Y5D",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
