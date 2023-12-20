import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBookAction, getBookListAction } from '../../redux/book/bookAction';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setSelectedBook } from '../../redux/book/bookSlice';

function BookTable() {
    const dispatch = useDispatch();
    const { bookList } = useSelector(state => state.book)
    // I need booklist to render book table
    useEffect(() => {
        dispatch(getBookListAction())
        dispatch(setSelectedBook({}))
    }, [dispatch])

    const deleteBook = (id) => {
        if (window.confirm("Do you want to delete?")) {
            dispatch(deleteBookAction(id))

        }
    }

    return (
        <div className='p-3'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>ISBN</th>
                        <th>Info</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((book, i) => {
                        return <tr key={book.id}>
                            <td>{i + 1}</td>
                            <td>
                                <img src={book.url} alt="book" width={"120px"} />
                            </td>
                            <td>
                                {book.isbn}
                            </td>
                            <td>
                                <div>
                                    {book.title} - {book.year}
                                </div>
                                <div>
                                    {book.summary}
                                </div>
                            </td>
                            <td>
                                <Link to={`/book/edit/${book.id}`}>
                                    <Button variant='warning'>Edit</Button>
                                </Link>
                                <Button variant='danger' onClick={() => deleteBook(book.id)}>Delete</Button>
                            </td>
                        </tr>
                    })}


                </tbody>
            </Table></div>
    )
}

export default BookTable