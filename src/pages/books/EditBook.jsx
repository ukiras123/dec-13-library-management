import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { addBookAction, getBookById, updateBookAction } from '../../redux/book/bookAction'
import { toast } from 'react-toastify'


function EditBook() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const { selectedBook } = useSelector(state => state.book)

    useEffect(() => {
        setFormData(selectedBook)
    }, [selectedBook])
    useEffect(() => {
        // Get the book info that matched with id
        // This is how you get data from you state
        // const thisBook = bookList.find(book => book.id == id)
        // if (thisBook) {
        //     setFormData(thisBook)
        // } else {
        //     toast.error("Book Not found")
        //     navigate("/book")
        // }
        // Get fresh data from DB
        dispatch(getBookById(id))
    }, [id])
    const inputs = [
        {
            label: "ISBN",
            placeholder: "ISBN #",
            name: "isbn",
            required: true,
            type: "text",
            value: formData?.isbn || ""
        },
        {
            label: "Book Title",
            placeholder: "Master Your Motivation",
            name: "title",
            required: true,
            type: "text",
            value: formData?.title || ""
        },
        {
            label: "Author Name",
            placeholder: "Kerry J",
            name: "author",
            required: true,
            type: "text",
            value: formData?.author || ""
        },
        {
            label: "Published Year",
            placeholder: "2020",
            name: "year",
            required: true,
            type: "number",
            value: formData?.year || ""
        },
        {
            label: "Summary",
            placeholder: "summary...",
            name: "summary",
            required: true,
            type: "text",
            as: "textarea",
            rows: "4",
            value: formData?.summary || ""
        },
        {
            label: "Image URL",
            placeholder: "https://...",
            name: "url",
            required: true,
            type: "url",
            value: formData?.url || ""
        },

    ]

    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault(); //it will stop page from refreshing
        console.log(formData)
        // make call to DB< action to udpate the value
        dispatch(updateBookAction(formData))
    }


    return (<AdminLayout title="Edit Book">
        <Link to="/book" className='ms-3'>
            <Button>Go Back</Button>
        </Link>
        <div className='p-3 border shadow rounded admin-form'>
            <Form onSubmit={handleOnSubmit}>
                {inputs.map(input => {
                    return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                })}

                <Button variant="primary" type="submit">
                    Update Book
                </Button>
            </Form>
        </div>
    </AdminLayout>
    )
}

export default EditBook