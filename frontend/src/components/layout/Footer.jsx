import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <h4 className='text-center'>All rights reserved &copy; term</h4>
            <p className='text-center mt-3'>
                <Link to={'/about'} >about</Link>
                |
                <Link to={'/contact'} >contact</Link>
                |
                <Link to={'/privacy'} >privacy policy</Link>
            </p>
        </div>
    )
}

export default Footer
