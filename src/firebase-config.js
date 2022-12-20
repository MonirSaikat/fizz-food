import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBzTBRfuZx-PyhVH9nkCOeRbfSjapc7128",
  authDomain: "fizz-food-7405b.firebaseapp.com",
  projectId: "fizz-food-7405b",
  storageBucket: "fizz-food-7405b.appspot.com",
  messagingSenderId: "882010464592",
  appId: "1:882010464592:web:fb93685dc813660ef88c55"
};

export const initFirebase = () => {
  return initializeApp(firebaseConfig);
};
