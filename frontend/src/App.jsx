import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePAge from './pages/HomePAge'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import NotFound from './pages/NotFound'

import './app.css'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import ForgotPassword from './pages/auth/ForgotPassword'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Products from './pages/admin/Products'
import UpdateProduct from './pages/admin/UpdateProduct'
import SearchPage from './pages/SearchPage'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePAge />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/dashboard' element={<PrivateRoute />} >
            <Route path='user' element={<Dashboard />} />
            <Route path='user/orders' element={<Orders />} />
            <Route path='user/profile' element={<Profile />} />
          </Route>

          <Route path='/dashboard' element={<AdminRoute />} >
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/create-category' element={<CreateCategory />} />
            <Route path='admin/create-product' element={<CreateProduct />} />
            <Route path='admin/product/:slug' element={<UpdateProduct />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='admin/users' element={<Users />} />
          </Route>

          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/product/:slug' element={<ProductDetails />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
