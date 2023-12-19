import React from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import BookTable from '../../components/books/BookTable'

function Books() {
    return (
        <AdminLayout title="Book">
            <div >
                <Link to="/add-book" className='d-flex justify-content-end me-3'>
                    <Button>Add a book</Button>
                </Link>
            </div>
            <BookTable />
        </AdminLayout>
    )
}

export default Books