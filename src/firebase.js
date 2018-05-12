import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDMU3Hbkk1jUty8U_TujolIatQmaWI3cRk',
  authDomain: 'redot-8c066.firebaseapp.com',
  databaseURL: 'https://redot-8c066.firebaseio.com',
  projectId: 'redot-8c066',
  storageBucket: 'gs://redot-8c066.appspot.com/',
  messagingSenderId: '176312930681',
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
