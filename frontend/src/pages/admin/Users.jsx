import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const Users = () => {
    return (
        <Layout title={'all users admin'}>
            <div className="row">
                <div className="col-md-3"><AdminMenu /></div>
                <div className="col-md-9 mt-5 ">All users</div>
            </div>
        </Layout>
    )
}

export default Users
