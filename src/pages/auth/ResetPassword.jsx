import React, { useState } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase-config'
import { toast } from 'react-toastify'

function ResetPassword() {
    const inputs = [

        {
            label: "Email *",
            placeholder: "abc@abc.com",
            name: "email",
            required: true,
            type: "email"
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
        const { email } = formData;
        sendPasswordResetEmail(auth, email).then(() => {
            toast.success("If you have an account with us, check your email")
        })
            .catch((error) => {
                toast.error(`Something went wrong ${error.message}`)

            });
    }
    return (
        <>
            <BaseLayout>
                {/* Anything inside BaseLayout will become a children */}
                {/* children prop is pre-defined by react */}
                <div className='p-3 border shadow rounded admin-form'>
                    <h1>Reset Password</h1>

                    <Form onSubmit={handleOnSubmit}>
                        {inputs.map(input => {
                            return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                        })}

                        <Button variant="primary" type="submit">
                            Reset
                        </Button>
                    </Form>
                    Want to login? <Link to='/login'>Login</Link>

                </div>
            </BaseLayout>
        </>
    )
}

export default ResetPassword