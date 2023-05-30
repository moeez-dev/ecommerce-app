import React, { useState } from 'react'
import axios from 'axios'
import Layout from '../../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [answer, setAnswer] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()
    // const [auth, setAuth] = useAuth()
    // const location = useLocation()

    //form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`, { email, answer, newPassword })

            navigate('/login')



        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }

    }
    return (
        <Layout className='container' title={'forgot password ecommerce app'} >
            <h1 className='text-center'>reset password</h1>

            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id='exampleInputEmail1' required />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleInputAnswer1" className="form-label">answer</label>
                    <input type="text" className="form-control" value={answer} id='exampleInputAnswer1' placeholder='what is your bestfriend name' onChange={(e) => setAnswer(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="exampleInputPassword1" required />
                </div>
                <button type="submit" className="btn btn-primary">submit</button>

            </form>
        </Layout>
    )
}

export default ForgotPassword
