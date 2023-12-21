import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase-config"
import { COLLECTION } from "../../utils"
import { setBorrowList } from "./borrowHistorySlice"


// CRUD Operations
export const addBookHistoryAction = (borrowObj) => async () => {
    try {
        console.log("Saving to DB...", borrowObj)
        const collectionRef = collection(db, COLLECTION.BORROW_HISTORY);
        const docRefPromise = addDoc(collectionRef, borrowObj)
        toast.promise(docRefPromise, {
            pending: "In Progress..."
        })
        await docRefPromise;
        toast.success("Successfully Borrowed")
    } catch (e) {
        toast.error(e.message)
    }
}


// Fetching book list from firebase and saving it to redux state
export const getBorrowListAction = () => async (dispatch) => {
    try {

        const collectionRef = collection(db, COLLECTION.BORROW_HISTORY);
        const querySnapshot = await getDocs(collectionRef);
        const borrowArr = []
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const borrowDetail = doc.data();
            borrowArr.push({
                ...borrowDetail,
                id
            })
        });
        // put the book to state
        dispatch(setBorrowList(borrowArr))
    } catch (e) {
        toast.error(e.message)
    }
}

export const getBorrowLisByUserIdtAction = (uid) => async (dispatch) => {
    try {

        const collectionRef = collection(db, COLLECTION.BORROW_HISTORY);
        const q = query(collectionRef, where("userId", "==", uid)); const borrowArr = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const borrowDetail = doc.data();
            borrowArr.push({
                ...borrowDetail,
                id
            })
        });
        // put the book to state
        dispatch(setBorrowList(borrowArr))
    } catch (e) {
        toast.error(e.message)
    }
}

export const updateBorrowAction = ({ id, ...rest }) => async (dispatch) => {
    try {
        const borrowRef = doc(db, COLLECTION.BORROW_HISTORY, id);
        const docPromise = setDoc(borrowRef, rest, { merge: true })
        toast.promise(docPromise, {
            pending: "In Progress..."
        })
        await docPromise;
        toast.success("Successfully Updated")
        // Update our state
        dispatch(getBorrowListAction())
    } catch (e) {
        toast.error(e.message)
    }
}
