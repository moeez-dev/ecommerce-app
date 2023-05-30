import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/Auth'

const Dashboard = () => {
    const [auth, setAuth] = useAuth()
    return (
        <Layout title={'dashboard ecommerce-app'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><UserMenu /></div>
                    <div className="col-md-9">
                        <div className="card w-75 m-auto">
                            <h1>User name : {auth?.user?.name} </h1>
                            <h1>User email : {auth?.user?.email} </h1>
                            <h1>User contact : {auth?.user?.phone} </h1>
                            <h1>User address : {auth?.user?.address} </h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
