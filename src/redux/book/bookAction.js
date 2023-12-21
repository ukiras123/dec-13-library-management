import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase-config"
import { setBookList, setSelectedBook } from "./bookSlice"
import { COLLECTION } from "../../utils"


// CRUD Operations
export const addBookAction = (bookObj) => async () => {
    try {
        console.log("Saving to DB...", bookObj)
        const collectionRef = collection(db, COLLECTION.BOOKS);
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


// Fetching book list from firebase and saving it to redux state
export const getBookListAction = () => async (dispatch) => {
    try {

        const collectionRef = collection(db, COLLECTION.BOOKS);
        const querySnapshot = await getDocs(collectionRef);
        const bookArr = []
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const bookDetail = doc.data();
            bookArr.push({
                ...bookDetail,
                id
            })
        });
        // put the book to state
        dispatch(setBookList(bookArr))
    } catch (e) {
        toast.error(e.message)
    }
}

export const updateBookAction = ({ id, ...rest }) => async (dispatch) => {
    try {
        const bookRef = doc(db, COLLECTION.BOOKS, id);
        const docPromise = setDoc(bookRef, rest, { merge: true })
        toast.promise(docPromise, {
            pending: "In Progress..."
        })
        await docPromise;
        toast.success("Successfully Updated")
        // Update our state
        dispatch(getBookListAction())
    } catch (e) {
        toast.error(e.message)
    }
}


export const getBookById = (id) => async (dispatch) => {
    try {
        const docRef = doc(db, 'books', id);
        const docSnapPromise = getDoc(docRef);
        toast.promise(docSnapPromise, {
            pending: "In Progress"
        })
        const docSnap = await docSnapPromise;
        if (docSnap.exists()) {
            const bookData = docSnap.data();
            dispatch(setSelectedBook({ ...bookData, id }))
            toast.success("Success")
        } else {
            toast.error("No book found")
        }
    } catch (e) {
        toast.error(e.message)
    }
}


export const deleteBookAction = (id) => async (dispatch) => {
    try {
        const bookRef = doc(db, COLLECTION.BOOKS, id);
        const docPromise = deleteDoc(bookRef)
        toast.promise(docPromise, {
            pending: "In Progress..."
        })
        await docPromise;
        toast.success("Successfully Deleted")
        // Update our state
        dispatch(getBookListAction())
    } catch (e) {
        toast.error(e.message)
    }
}

