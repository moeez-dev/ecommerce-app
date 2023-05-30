import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './layout.css'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>
            <Header />
            <main style={{ minHeight: '80vh' }} >
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'ecommerce app--shop now',
    description: 'mern stack project',
    keywords: 'mern,react,node,mongodb',
    author: 'terminator'
}

export default Layout