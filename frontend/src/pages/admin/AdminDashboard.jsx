import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/Auth'

const AdminDashboard = () => {
    const [auth, setAuth] = useAuth()
    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 mt-4">
                        <div className="card w-75 m-auto">
                            <h1 className='text-center' >admin name : {auth?.user?.name}</h1>
                            <h1 className='text-center' >admin email : {auth?.user?.email}</h1>
                            <h1 className='text-center' >admin contact : {auth?.user?.phone}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
