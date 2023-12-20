import React, { useEffect } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import BookCarousels from '../../components/carousels/BookCarousels'
import { useDispatch, useSelector } from 'react-redux'
import { getBookListAction } from '../../redux/book/bookAction';
import { Row, Col, Container } from 'react-bootstrap';
import BookCard from '../../components/books/BookCard';

function Home() {
    const dispatch = useDispatch();
    const { bookList } = useSelector(state => state.book)
    useEffect(() => {
        dispatch(getBookListAction())
    }, [])
    return (
        <BaseLayout>
            {/* Carousels */}
            <BookCarousels />
            {/* Book list */}
            <Container>
                <Row>
                    <Col>
                        <h1>Acailable Books</h1>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex flex-wrap gap-2 justify-content-around'>
                        {bookList.map(book => {
                            return <BookCard key={book.id} {...book} />
                        })}
                    </Col>
                </Row>
            </Container>
        </BaseLayout>

    )
}

export default Home