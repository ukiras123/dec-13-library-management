import React, { useState } from 'react'

import BaseLayout from '../../components/layouts/BaseLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase-config'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../redux/auth/authSlice'
import { getUserInfoAction } from '../../redux/auth/authAction'

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
    const dispatch = useDispatch();
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
        const { email, password } = formData;
        try {
            const signInPormise = signInWithEmailAndPassword(auth, email, password);
            toast.promise(signInPormise, {
                pending: "In Progress..."
            })
            const { user: { uid } } = await signInPormise;
            // Get user info from dB and put that on redux
            console.log(uid)
            dispatch(getUserInfoAction(uid))
        } catch (e) {
            if (e.message.includes('auth/invalid-credential')) {
                toast.error("Email or Password not match")
            } else {
                toast.error(e.message)
            }
        }
    }

    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // });
    // TODO: Do what you need to do with this obj
    // Firebase , DB Save, ....


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