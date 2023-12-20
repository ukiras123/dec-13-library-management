import React, { useEffect, useState } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Col, Container, Row } from 'react-bootstrap'

function BookLanding() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [selectedBook, setSelectedBook] = useState({})
    const { bookList } = useSelector(state => state.book)
    useEffect(() => {
        const thisBook = bookList.find(book => book.id == id)
        if (thisBook) {
            setSelectedBook(thisBook)
        } else {
            navigate("/")
        }
    }, [id])
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
                            <Button>Borrow Book</Button>
                        </div>
                    </Col>

                </Row>
            </Container>
        </BaseLayout>
    )
}

export default BookLanding