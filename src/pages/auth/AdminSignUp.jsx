import React, { useState } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'

function AdminSignUp() {

    const inputs = [
        {
            label: "First Name *",
            placeholder: "Enter First Name",
            name: "fName",
            required: true,
            type: "text"
        },
        {
            label: "Last Name *",
            placeholder: "Enter Last Name",
            name: "lName",
            required: true,
            type: "text"
        },
        {
            label: "Phone",
            placeholder: "043-0000",
            name: "phone",
            type: "number"
        },
        {
            label: "Email *",
            placeholder: "abc@abc.com",
            name: "email",
            required: true,
            type: "email"
        },
        {
            label: "Password",
            placeholder: "******",
            name: "password",
            required: true,
            type: "password",
            minLength: 6
        },
        {
            label: "Confirm Password",
            placeholder: "******",
            name: "confirmPassword",
            required: true,
            type: "password",
            minLength: 6
        },
    ]

    const [formData, setFormData] = useState({});

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault(); //it will stop page from refreshing
        console.log(formData)
        // Validate the input
        // TODO: Do what you need to do with this obj
        // Firebase , DB Save, ....
    }
    return (
        <>
            <BaseLayout>
                {/* Anything inside BaseLayout will become a children */}
                {/* children prop is pre-defined by react */}
                <div className='p-3 border shadow rounded admin-form'>
                    <Form onSubmit={handleOnSubmit}>
                        {inputs.map(input => {
                            return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                        })}

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </BaseLayout>
        </>
    )
}

export default AdminSignUp