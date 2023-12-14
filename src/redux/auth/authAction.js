import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { setUserInfo } from "./authSlice";

export const getUserInfoAction = (uid) => async (dispatch) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data()
            dispatch(setUserInfo(userData))
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.log(e)
    }
}