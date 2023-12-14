import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

function SideBar() {
    const { userInfo } = useSelector(state => state.auth)
    const { pathname } = useLocation()
    const sideLinks = [
        {
            path: "/dashboard",
            label: "Dashboard"
        },
        {
            path: "/book",
            label: "Book"
        },
        {
            path: "/history",
            label: "History"
        },
        {
            path: "/client",
            label: "Client"
        }
    ]
    return (
        <div className='bg-dark text-light'>
            <div className='mt-4 p-2 text-center'>
                Welcome, {userInfo.fName} ({userInfo.role})
            </div>
            <hr />
            <ul className='list-unstyled ms-3 side-links'>
                {sideLinks.map(link => {
                    const isActive = pathname.includes(link.path);
                    return <li key={link.path}>
                        <Link className={`nav-link mb-3 p-2 ${isActive ? "active" : ""}`} to={link.path}>{link.label}</Link>
                    </li>

                })}

            </ul>
        </div>
    )
}

export default SideBar