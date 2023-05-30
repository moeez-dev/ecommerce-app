import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [id, setId] = useState('')

    //get single product
    const getSingleProduct = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`,)
        setName(data.product.name)
        setId(data.product._id)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
        setCategory(data.product.category._id)
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`,)
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong in getting category')
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    //create product
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            productData.append('shipping', shipping)
            photo && productData.append('photo', photo)
            productData.append('category', category)


            const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/product/update-product/${id}`, productData)
            if (data?.succcess) {
                toast.error(data?.message)

            } else {
                toast.success('product updated successfully')
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //delete handler
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            let answer = prompt('are you sure you want to delete this product')
            if (!answer) return
            const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`)
            toast.success('product deleted successfully')
            navigate('/dashboard/admin/products')

        } catch (error) {
            console.log(error)
            toast.error('something went wrong while deleting product')
        }
    }

    return (
        <Layout title={'create product admin'}>
            <div className="row">
                <div className="col-md-3"><AdminMenu /></div>
                <div className="col-md-9 mt-5">
                    <h1>Update product</h1>
                    <div className="m-1 w-75">
                        <Select bordered={false} placeholder='select a category' size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}
                            value={category}
                        >
                            {
                                categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))
                            }
                        </Select>
                        <div className="mb-3">
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo ? photo.name : 'Upload photo'}
                                <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="product photo" className='img img-responsive' height={'200px'} />
                                </div>
                            ) :
                                (<div className="text-center">
                                    <img src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${id}`} alt="product photo" className='img img-responsive' height={'200px'} />
                                </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <input type="text" value={name} placeholder='write product name' className='form-control' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={description} placeholder='write product description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="number" value={price} placeholder='write product price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="number" value={quantity} placeholder='write product quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <Select bordered={false} placeholder='select shipping' size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }}
                                value={shipping ? 'yes' : 'no'}
                            >
                                <Option value={'0'} >no</Option>
                                <Option value={'1'} >yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-primary' onClick={handleUpdate} >UPDATE PRODUCT</button>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-danger' onClick={handleDelete} >DELETE PRODUCT</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
