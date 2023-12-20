import React, { useEffect, useState } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { addBookHistoryAction } from '../../redux/borrowHistory/borrorHistoryAction'
import { updateBookAction } from '../../redux/book/bookAction'

function BookLanding() {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedBook, setSelectedBook] = useState({})
    const { bookList } = useSelector(state => state.book)
    const { userInfo } = useSelector(state => state.auth)
    useEffect(() => {
        const thisBook = bookList.find(book => book.id == id)
        if (thisBook) {
            setSelectedBook(thisBook)
        } else {
            navigate("/")
        }
    }, [id, bookList, navigate])
    const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000
    const handleOnBorrow = () => {
        // 1. Create a borrow history, who what when
        const borrowObj = {
            userId: userInfo?.uid,
            userName: userInfo.fName,
            bookId: id,
            bookTitle: selectedBook.title,
            url: selectedBook.url,
            borrowAt: Date.now(),
            availableFrom: Date.now() + fourteenDaysInMs
        }
        dispatch(addBookHistoryAction(borrowObj))
        // 2. Update book info to say it is not available, will be availa in 14 days
        const bookupdate = {
            id,
            isAvailable: false,
            availableFrom: Date.now() + fourteenDaysInMs
        }
        dispatch(updateBookAction(bookupdate))
    }
    return (
        <BaseLayout>
            <Container>
                <Row>
                    <Link to="/">
                        <Button className='mt-2'>Go Back</Button>
                    </Link>
                </Row>
                <Row>
                    <Col>
                        <img src={selectedBook.url} alt="" />
                    </Col>
                    <Col>
                        <h3>{selectedBook.title}</h3>
                        <p>Rating: 5 star</p>
                        <p>Published: {selectedBook.year}</p>
                        <p>{selectedBook.summary}</p>
                        <div>
                            {userInfo?.uid ?
                                (
                                    selectedBook?.isAvailable ?
                                        <Button onClick={handleOnBorrow}>Borrow Book</Button>
                                        : <Button disabled>Available From: {new Date(selectedBook?.availableFrom).toDateString()}</Button>)

                                :
                                <Link to='/login' state={{ path: `/books/${id}` }}>
                                    <Button>Login to Borrow</Button>
                                </Link>}
                        </div>
                    </Col>

                </Row>
            </Container>
        </BaseLayout>
    )
}

export default BookLanding