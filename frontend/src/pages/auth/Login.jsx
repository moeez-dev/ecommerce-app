import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import './auth.css'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const location = useLocation()

    //form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }

    }
    return (
        <Layout className='container' title={'register ecommerce app'} >
            <h1 className='text-center'>login</h1>

            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id='exampleInputEmail1' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" onClick={() => navigate('/forgot-password')} className="btn btn-primary mx-4" >Forgot password</button>
            </form>
        </Layout>
    )
}

export default Login
