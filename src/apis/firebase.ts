// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue } from "firebase/database";

// set, update, remove
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC20FNT4eMCSuu6Qs4jAEH2_RjAIAciFCw",
  authDomain: "inventario-tienda-f9cb7.firebaseapp.com",
  databaseURL: "https://inventario-tienda-f9cb7-default-rtdb.firebaseio.com",
  projectId: "inventario-tienda-f9cb7",
  storageBucket: "inventario-tienda-f9cb7.appspot.com",
  messagingSenderId: "1040126774338",
  appId: "1:1040126774338:web:c4716086a6a37231ccb1db"
};

export const firebaseApi = () => {
    // Initialize Firebase
    const conf = initializeApp(firebaseConfig);
    const db = getDatabase(conf);

    const getData = async (collectionName: string) => {
        const dataRef = ref(db, collectionName);
        onValue( dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }

    const addData = async (collectionName: string) => {}

    const updateData  = async (collectionName: string) => {}

    const deleteData  = async (collectionName: string) => {}

    return {
        // Properties
        db,

        // Methods
        getData,
        addData,
        updateData,
        deleteData
    }
}
