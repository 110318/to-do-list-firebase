import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

const firebaseConfig = {
    apiKey: "AIzaSyAQTEoP1VnQi7rIJgOQB5bJxhmOH1UgyiA",
    authDomain: "fir-prog-web-akilla.firebaseapp.com",
    projectId: "fir-prog-web-akilla",
    storageBucket: "fir-prog-web-akilla.appspot.com",
    messagingSenderId: "416056299259",
    appId: "1:416056299259:web:1a6c27ea080d6a4ed66a5e"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)


export async function getTasks(){
    const allTasks = []

    const querySnapshot = await getDocs(collection(db, "tasks"))
    querySnapshot.forEach((doc) => {
        allTasks.push({...doc.data(), id: doc.id})

    })

    return allTasks



}

export async function deleteTask(taskId){
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        alert('Tarea eliminada correctamente')
    } catch(error){
        console.error('Error al eliminar la tarea', error)
    }
}


export async function addTask(taskTitle){
    try{
        const docRef = await addDoc(collection(db, "tasks"),{
            title: taskTitle,
        })
        console.log("Document written with ID: ", docRef.id);
    }catch (e){
        console.error("Error adding document:", e)
    }

}
export async function editDocument(title, id) {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}