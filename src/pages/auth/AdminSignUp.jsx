import React, { useState } from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase-config'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: "admin"
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault(); //it will stop page from refreshing
        // Validate the input
        const { password, confirmPassword, ...rest } = formData;
        const { email } = formData;
        if (password !== confirmPassword) {
            return toast.error("Password Did not match!")
        }
        try {


            const authSnapPromise = createUserWithEmailAndPassword(auth, email, password)
            toast.promise(authSnapPromise, {
                pending: "In Progress..."
            })
            const authSnap = await authSnapPromise;
            const uid = authSnap.user.uid

            // TODO: User this UID as a id anc create a collection in firestore with formData
            const userDoc = doc(db, "users", uid);
            await setDoc(userDoc, {...rest, uid});
            toast.success("User Created!")
            // Redirect to login page
            navigate("/login")
        } catch (e) {
            console.log(e)
            if (e.message.includes('auth/email-already-in-use')) {
                toast.error("Email Already Used")
            } else {
                toast.error(e.message)
            }
        }
    }
    return (
        <>
            <BaseLayout>
                {/* Anything inside BaseLayout will become a children */}
                {/* children prop is pre-defined by react */}
                <div className='p-3 border shadow rounded admin-form'>
                    <h1>Register Admin</h1>

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
