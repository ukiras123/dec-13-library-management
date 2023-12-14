import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import Footer from './Footer'

function AdminLayout({ children, title }) {
    return (
        <div className='d-flex'>
            {/* left */}
            <SideBar />
            {/* right */}
            <div className='flex-grow-1'>
                <Header />
                <div className='m-3'>
                    <h1>{title}</h1>
                    <hr />
                </div>
                <main className="main">
                    {children}
                </main>

                <Footer />
            </div>

        </div>
    )
}

export default AdminLayout