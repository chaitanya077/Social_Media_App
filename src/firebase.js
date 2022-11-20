// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore , getDocs , onSnapshot, collection, CollectionReference, doc} from "firebase/firestore";
import {getAuth , createUserWithEmailAndPassword} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi3XX2cwWIqfZG9SoD40j-M1YPMByZr2I",
  authDomain: "instagram-clone-react-37d56.firebaseapp.com",
  projectId: "instagram-clone-react-37d56",
  storageBucket: "instagram-clone-react-37d56.appspot.com",
  messagingSenderId: "95655701730",
  appId: "1:95655701730:web:c73aabaf43229c4cc982bb",
  measurementId: "G-5D0HWRJT9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();
const colRef = collection(db, "posts");
// const comRef = doc(db,"posts","comments")
const storage = getStorage(app);

// // get collection data
// getDocs(colRef).then((snapshot) => {
//     let postss =[];
//     snapshot.docs.forEach((doc)=>{
//         postss.push({...doc.data(), id: doc.id})
//     })
//     console.log(postss);
// })
// .catch(err=> {console.log(err.message)});

// onSnapshot(colRef , (snapshot)=>{
//     let postss = [];
//     snapshot.docs.map(doc =>(
//      postss.push({...doc.data(), id: doc.id})
//     ))
//     console.log(postss);
// })
export {colRef, db , auth, storage};

