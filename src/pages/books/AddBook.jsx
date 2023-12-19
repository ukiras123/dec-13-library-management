import React, { useRef, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { useDispatch } from 'react-redux'
import { addBookAction } from '../../redux/book/bookAction'
import { toast } from 'react-toastify'

function AddBook() {
    const [formData, setFormData] = useState({});
    const formRef = useRef(null);
    const inputs = [
        {
            label: "ISBN",
            placeholder: "ISBN #",
            name: "isbn",
            required: true,
            type: "text",
            // value: formData?.isbn || ""
        },
        {
            label: "Book Title",
            placeholder: "Master Your Motivation",
            name: "title",
            required: true,
            type: "text",
            // value: formData?.title || ""
        },
        {
            label: "Author Name",
            placeholder: "Kerry J",
            name: "author",
            required: true,
            type: "text",
            // value: formData?.author || ""
        },
        {
            label: "Published Year",
            placeholder: "2020",
            name: "year",
            required: true,
            type: "number",
            // value: formData?.year || ""
        },
        {
            label: "Summary",
            placeholder: "summary...",
            name: "summary",
            required: true,
            type: "text",
            as: "textarea",
            rows: "4",
            // value: formData?.summary || ""
        },
        {
            label: "Image URL",
            placeholder: "https://...",
            name: "url",
            required: true,
            type: "url",
            // value: formData?.url || ""
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
        // Do Validation here
        const { year } = formData;
        if (parseInt(year) < 1900 || +year > new Date().getFullYear()) {
            return toast.error("Published year invalid")
        }
        // TODO: check for the ISBN unituqness
        // Save the book data to Firebase
        await dispatch(addBookAction(formData))
        formRef.current.reset()
    }

    return (
        <AdminLayout title="Add Book">
            <Link to="/book" className='ms-3'>
                <Button>Go Back</Button>
            </Link>
            <div className='p-3 border shadow rounded admin-form'>
                <Form onSubmit={handleOnSubmit} ref={formRef}>
                    {inputs.map(input => {
                        return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                    })}

                    <Button variant="primary" type="submit">
                        Add Book
                    </Button>
                </Form>
            </div>
        </AdminLayout>
    )
}

export default AddBook