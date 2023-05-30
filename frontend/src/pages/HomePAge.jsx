import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/Auth.jsx'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd'
import { prices } from '../components/prices'
import Spinner from '../components/Spinner'
import { useCart } from '../context/cart'

const HomePAge = () => {
    const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useCart()
    const navigate = useNavigate()

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-count`,)
            setTotal(data?.total)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong in getting total')
        }
    }


    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`,)
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllCategories()
        getTotal()
    }, [])


    //get all products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts(data?.products)

        } catch (error) {
            console.log(error)
            toast('something went wrong while getting products')
        }
    }



    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //life cycle
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    //life cycle
    useEffect(() => {
        if (!checked.length || !radio.length) {
            getAllProducts()
        }
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) {
            filterProducts()
        }
    }, [checked, radio])

    //filter by category
    const handleFilter = async (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }

    //filtered products
    const filterProducts = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/product/filter-product`, { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong while filtering')
        }
    }


    return (
        <Layout title={'all products -- best offers'}>
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="d-flex flex-column mx-3 mb-3">
                        <h4 className='text-center '>filter by category</h4>

                        {
                            categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} >
                                    {c.name}
                                </Checkbox>
                            ))
                        }
                    </div>

                    {/* price filter */}
                    <div className="d-flex flex-column mx-3">
                        <h4 className='text-center '>filter by price</h4>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)} >
                            {
                                prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array} >{p.name}</Radio>

                                    </div>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column mx-3">
                        <button className='btn btn-danger' onClick={() => window.location.reload()} >clear filters</button>
                    </div>

                </div>

                <div className="col-md-9">
                    {JSON.stringify(checked, null, 4)}
                    {JSON.stringify(radio, null, 4)}
                    <h1 className='text-center'>all products </h1>
                    <h1>products</h1>
                    <div className='d-flex flex-wrap'>
                        {
                            products?.map((item, index) => (
                                <div key={index} className="card m-2" style={{ width: '18rem' }}>
                                    <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt="product pic" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">${item.price}</p>
                                        <button className='btn btn-primary mx-2' onClick={() => navigate(`/product/${item.slug}`)} >see details</button>
                                        <button className='btn btn-secondary mx-2'
                                            onClick={() => {
                                                setCart([...cart, item])
                                                localStorage.setItem('cart', JSON.stringify([...cart, item]))
                                                toast.success('item added to cart')
                                            }} > add to cart </button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className='m-2 p-3'>
                        {
                            products && products.length < total && (
                                <button className='btn btn-warning' onClick={(e) => {
                                    e.preventDefault()
                                    setPage(page + 1)
                                }} >
                                    {loading ? <Spinner /> : 'load more'}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePAge
