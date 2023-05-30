import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import './auth.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()



    //form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`, { name, email, password, phone, address, answer })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
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
            <h1 className='text-center'>register</h1>

            <form className='container' onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id='exampleInputName1' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id='exampleInputEmail1' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone1" className="form-label">Phone</label>
                        <input type="number" className="form-control" value={phone} id='exampleInputPhone1' required onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAdress1" className="form-label"> address</label>
                        <input type="text" className="form-control" value={address} id='exampleInputAdress1' onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAnswer1" className="form-label">Question</label>
                        <p> in case if you forget password and want to reset it...it will be based on this sentence..please remember the sentence or word you write here</p>
                        <input type="text" className="form-control" value={answer} id='exampleInputAnswer1' placeholder='what is your bestfriend name' onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </Layout>
    )
}

export default Register
