import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookList: [],
    selectedBook: {},
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBookList: (state, action) => {
            state.bookList = action.payload
        },
        setSelectedBook: (state, action) => {
            state.selectedBook = action.payload
        }
    }
})

export const { setBookList, setSelectedBook } = bookSlice.actions

export default bookSlice.reducer