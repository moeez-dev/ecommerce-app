import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {

    //state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    //context
    const [auth, setAuth] = useAuth()

    //getUser data
    useEffect(() => {
        const { name, email, phone, address, } = auth?.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth?.user])


    //form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/auth/profile`, { name, password, phone, address })

            setAuth({ ...auth, user: data?.updatedUser })
            let ls = localStorage.getItem('auth')
            ls = JSON.parse(ls)
            ls.user = data?.updatedUser
            localStorage.setItem('auth', JSON.stringify(ls))
            toast.success('profile updated succcessfully')


        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <Layout title={'dashboard--profile'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><UserMenu /></div>
                    <div className="col-md-9">
                        <h1>user profile</h1>

                        <form className='container' onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id='exampleInputName1' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} disabled id='exampleInputEmail1' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPhone1" className="form-label">Phone</label>
                                    <input type="number" className="form-control" value={phone} id='exampleInputPhone1' onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputAdress1" className="form-label"> address</label>
                                    <input type="text" className="form-control" value={address} id='exampleInputAdress1' onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <button type="submit" className="btn btn-primary">Update User Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )

}
export default Profile
