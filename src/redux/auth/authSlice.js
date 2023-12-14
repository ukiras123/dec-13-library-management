import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {},
}

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer