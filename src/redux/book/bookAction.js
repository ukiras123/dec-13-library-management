import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase-config"



export const addBookAction = (bookObj) => async () => {
    try {
        console.log("Saving to DB...", bookObj)
        const collectionRef = collection(db, "books");
        const docRefPromise = addDoc(collectionRef, bookObj)
        toast.promise(docRefPromise, {
            pending: "In Progress..."
        })
        await docRefPromise;
        toast.success("Successfully created book")
    } catch (e) {
        toast.error(e.message)
    }

}