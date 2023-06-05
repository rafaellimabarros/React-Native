import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyAEkXdrKxoPE6_2Q0oDPKJT-yVpd5_dukk",
        authDomain: "appfinancas-60c01.firebaseapp.com",
        projectId: "appfinancas-60c01",
        storageBucket: "appfinancas-60c01.appspot.com",
        messagingSenderId: "533470410602",
        appId: "1:533470410602:web:0f16e195f65a93581e1713",
        measurementId: "G-B30JFPGMEH"
      };

  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
}

export default StartFirebase;
