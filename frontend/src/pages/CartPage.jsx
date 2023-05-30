import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [clientToken,setClientToken] = useState('')
    const [instance,setIntance] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    //total price
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((i) => total += i.price)
            return total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
        } catch (error) {
            console.log(error)
        }
    }

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === pid)
            myCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(myCart))
            setCart(myCart)

        } catch (error) {
            console.log(error)
        }
    }

 //get client token
        const getToken = async()=>{
            try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/braintree/token` )
                        setClientToken(data?.clientToken)
            } catch (error) {
                console.log(error)
            }
        }

        //
useEffect(()=>{
       getToken()
},[auth?.token])

//payment handler
const handlePayment = async()=>{
    try {
        const {nonce} = await instance.requestPaymentMethod()
        const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/product/braintree/payment`,{nonce,cart} )
        localStorage.removeItem('cart')
        setCart([])
        navigate('/dashboard/user/orders')

    } catch (error) {
        console.log(error)
    }
}


    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-3 mb-3'>
                            {`hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length ? `you have ${cart?.length} items in cart ${auth?.token ? '' : 'please login to check out'}` : ('no items in your cart')}
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            {
                                cart?.map((item, index) => (
                                    <div key={index} className="row mb-3 p-2 card flex-row">
                                        <div className="col-md-4">
                                            <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`} className="img-fluid" height={'100px'} width={'100px'} alt={item.name} />
                                        </div>
                                        <div className="col-md-4">
                                            <p>{item.name}</p>
                                            <p>{item.description.substring(0, 30)}</p>
                                            <p>price {item.price}</p>
                                            <button className='btn btn-danger' onClick={() => removeCartItem(item._id)} >remove</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-4 text-center">
                            <h2>cart summary</h2>
                            <p>total | checkout | payment</p>
                            <hr />
                            <h4>total : {totalPrice()}</h4>
                            {
                                auth?.user?.address ? (
                                    <>
                                        <div className='mb-3'>
                                            <h4>current address</h4>
                                            <h5>{auth?.user?.address}</h5>
                                            <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')} >Update Adress</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className='mb-3'>
                                        {
                                            auth?.token ? (
                                                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')} >Update Address</button>
                                            ) : (
                                                <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: '/cart' })} >please login to checkout</button>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <div className="mt-2">
                                <DropIn 
                                 options={{
                                    authorization:clientToken,
                                    paypal:{
                                        flow:'vault'
                                    }
                                 }}
                                 onInstance={(instance)=>setIntance(instance)}
                                />
                                <button className='btn btn-primary' onClick={handlePayment} >Make Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
