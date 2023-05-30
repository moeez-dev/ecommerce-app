import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {

    return (
        <>
            <div className='text-center' >
                <h4>user panel</h4>
                <div className='list'>
                    <ul className="list-group">
                        <NavLink to={'/dashboard/user/profile'} className="list-group-item">Profile</NavLink>
                        <NavLink to={'/dashboard/user/orders'} className="list-group-item">Orders</NavLink>
                    </ul>
                </div>

            </div>

        </>
    )
}

export default UserMenu
