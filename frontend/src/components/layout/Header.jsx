import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { GiShoppingBag } from 'react-icons/gi'

import './layout.css'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'

import { Avatar, Badge } from 'antd'

const Header = () => {
    const [auth, setAuth] = useAuth()
    const categories = useCategory()
    const [cart, setCart] = useCart()

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
        toast.success('logout successfully')
    }

    return (
        <>
            <nav className=" navbar navbar-expand-lg bg-body-tertiary">
                <div className=" d-flex container-fluid">
                    <Link className="navbar-brand" > <GiShoppingBag /> Ecommerce app </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className=" collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link " aria-current="page" >Home</NavLink>
                            </li>

                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to={'/register'} className="nav-link" aria-current="page" >Signup</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'/login'} className="nav-link" >Login</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item">
                                        <NavLink to={`/dashboard/${auth?.user?.role == 1 ? 'admin' : 'user'}`} className="nav-link" >dashboard</NavLink>
                                    </li>


                                    <li className="nav-item">
                                        <NavLink onClick={handleLogout} to={'/login'} className="nav-link" >Logout</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <p className={'nav-link'}>{auth?.user?.name}</p>
                                    </li>
                                </>)
                            }




                            <li className="nav-item">
                                <Badge count={cart?.length} showZero className='nav-item' >
                                    <NavLink to={'/cart'} className="nav-link" >  Cart   </NavLink>
                                </Badge>


                            </li>
                            <SearchInput />
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
