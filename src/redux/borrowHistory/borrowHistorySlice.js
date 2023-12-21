import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    borrowList: [],
}

export const borrowSlice = createSlice({
    name: "borrow",
    initialState,
    reducers: {
        setBorrowList: (state, action) => {
            state.borrowList = action.payload
        },
    }
})

export const { setBorrowList } = borrowSlice.actions

export default borrowSlice.reducer