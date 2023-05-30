import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/cart'

const ProductDetails = () => {

    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const navigate = useNavigate()
    const [cart, setCart] = useCart()


    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [params?.slug])

    //get su=ingle product detail
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            similarProduct(data?.product?._id, data?.product?.category?._id)

        } catch (error) {
            console.log(error)
        }
    }

    //similar product
    const similarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.products)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while getting similar products')
        }
    }

    return (
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${product._id}`} className="img-fluid" height={'700px'} width={'700px'} alt={product.name} />
                </div>
                <div className="col-md-6 text-center d-flex flex-column gap-3">
                    <h1>product details</h1>
                    <h6>name : {product.name}</h6>
                    <h6>category : {product?.category?.name}</h6>
                    <h6>description : {product.description}</h6>
                    <h6>price : {product.price}</h6>
                    <h6>quantity : {product.quantity}</h6>
                    <h6>shipping : {product.shipping ? 'yes' : 'no'}</h6>
                    <button className='btn btn-secondary mx-2' onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        toast.success('item added to cart')
                    }} > add to cart </button>

                </div>
            </div>
            <div className="row container">
                <h1>similar products</h1>
                {relatedProduct?.length < 1 && <p>no similar product found</p>}
                <div className="row d-flex flex-wrap justify-content-center">
                    {
                        relatedProduct?.map((item, index) => (
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

export default ProductDetails
