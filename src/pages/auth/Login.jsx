import React, { useState } from 'react'

import BaseLayout from '../../components/layouts/BaseLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'

function Login() {
    const inputs = [

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
        }

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

    return (<>
        <>
            <BaseLayout>
                <div className='p-3 border shadow rounded admin-form'>
                    <h1>Login</h1>
                    <Form onSubmit={handleOnSubmit}>
                        {inputs.map(input => {
                            return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                        })}

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </BaseLayout>
        </>
    </>
    )
}

export default Login