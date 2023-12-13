import React from 'react'
import Header from './Header'
import Footer from './Footer'

function BaseLayout({ children }) {
    return (
        <>
            <Header />

            <main className="main">
                {children}
            </main>

            <Footer />
        </>
    )
}

export default BaseLayout