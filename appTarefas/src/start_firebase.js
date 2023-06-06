import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase(){
  const firebaseConfig = {
    apiKey: "AIzaSyDx-J0r-D_saDp4-IbtXzaUQVeJhwsD6HA",
    authDomain: "tarefas-8e8bf.firebaseapp.com",
    databaseURL: "https://tarefas-8e8bf-default-rtdb.firebaseio.com",
    projectId: "tarefas-8e8bf",
    storageBucket: "tarefas-8e8bf.appspot.com",
    messagingSenderId: "37444355521",
    appId: "1:37444355521:web:e4d26bcd448835ffe75b40"
  };

  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
}

export default StartFirebase;