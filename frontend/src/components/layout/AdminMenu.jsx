import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {

    return (
        <>
            <div className='text-center' >
                <h4>admin panel</h4>
                <div className='list'>
                    <ul className="list-group">
                        <NavLink to={'/dashboard/admin/create-category'} className="list-group-item">Create category</NavLink>
                        <NavLink to={'/dashboard/admin/create-product'} className="list-group-item">Create product</NavLink>
                        <NavLink to={'/dashboard/admin/products'} className="list-group-item">Products</NavLink>
                        <NavLink to={'/dashboard/admin/users'} className="list-group-item">user</NavLink>
                    </ul>
                </div>

            </div>

        </>
    )
}

export default AdminMenu
