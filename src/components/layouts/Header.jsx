import { signOut } from 'firebase/auth';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { setUserInfo } from '../../redux/auth/authSlice';

function Header() {
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(setUserInfo({}))
        })
    }
    return (
        <Navbar expand="lg" bg='dark' variant='dark' >
            <Container>
                <Navbar.Brand href="/">Library Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userInfo?.uid ? (
                            <>
                                <Link className='nav-link' to="/dashboard">Dashboard</Link>
                                <Link className='nav-link' to="#" onClick={handleLogout}>Logout</Link>
                            </>
                        ) :
                            (
                                <>
                                    {/* <Link className='nav-link' to="/admin-signup">Sign Up</Link> */}
                                    <Link className='nav-link' to="/login">Login</Link>
                                </>
                            )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header