import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './admin.css'

const Products = () => {
    const [products, setProducts] = useState([])

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product`)
            setProducts(data.product)
        } catch (error) {
            console.log(error)
            toast('something went wrong while getting products')
        }
    }

    //life cycle
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'> all products list</h1>
                    <div className="d-flex flex-wrap">
                        {
                            products?.map((item, index) => (
                                <Link key={index} to={`/dashboard/admin/product/${item.slug}`} className='product-link' >
                                    <div className="card m-2" style={{ width: '18rem' }}>
                                        <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt="product pic" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description}</p>
                                        </div>
                                    </div>
                                </Link>

                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
