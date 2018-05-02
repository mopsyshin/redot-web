import firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDMU3Hbkk1jUty8U_TujolIatQmaWI3cRk',
  authDomain: 'redot-8c066.firebaseapp.com',
  databaseURL: 'https://redot-8c066.firebaseio.com',
  projectId: 'redot-8c066',
  storageBucket: '',
  messagingSenderId: '176312930681',
});

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);
const db = firebaseApp.firestore();
export default db;
