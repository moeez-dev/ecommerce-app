import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'

const SearchPage = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    return (
        <Layout title={'ecommerce app--search results'}>
            <div className="container">
                <div className="text-center">
                    <h1>search results</h1>
                    <h6>{values?.result.length < 1 ? 'no products found' : `found ${values?.result?.length}`}</h6>
                    {
                        values?.result?.map((item, index) => (
                            <div key={index} className="card m-2" style={{ width: '18rem' }}>
                                <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt="product pic" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">${item.price}</p>
                                    <button className='btn btn-primary mx-2' onClick={() => navigate(`/product/${item.slug}`)} >see details</button>
                                    <button className='btn btn-secondary mx-2' onClick={() => {
                                        setCart([...cart, item])
                                        localStorage.setItem('cart', JSON.stringify([...cart, item]))
                                        toast.success('item added to cart')
                                    }} > add to cart </button>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default SearchPage
