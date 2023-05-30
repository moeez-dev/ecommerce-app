import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({ path = 'login' }) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => --prevCount)
            count === 0 && navigate(`${path}`, { state: location.pathname })
        }, 1000)
        return () => clearInterval(interval)
    }, [count, navigate, location])

    return (<>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ 'height': '100vh' }}>
            <h1 className='text-center'>you cant access this Route... redirecting in {count}s</h1>

            <div className="spinner-border " role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    </>
    )
}

export default Spinner
