import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { ADMIN_ONLY, ALL } from '../../utils'

function SideBar() {
    const { userInfo } = useSelector(state => state.auth)
    const { pathname } = useLocation()
    const sideLinks = [
        {
            path: "/dashboard",
            label: "Dashboard",
            role: ADMIN_ONLY
        },
        {
            path: "/book",
            label: "Book",
            role: ADMIN_ONLY
        },
        {
            path: "/history",
            label: "History",
            role: ALL
        },
        {
            path: "/client",
            label: "Client",
            role: ADMIN_ONLY
        },
        {
            path: "/admin-signup",
            label: "Admin Mgmt",
            role: ADMIN_ONLY
        }
    ]

    return (
        <div className='bg-dark text-light'>
            <div className='mt-4 p-2 text-center'>
                Welcome, {userInfo.fName} ({userInfo.role})
            </div>
            <hr />
            <ul className='list-unstyled ms-3 side-links'>
                {sideLinks.filter(sl => sl.role.includes(userInfo.role)).map(link => {
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