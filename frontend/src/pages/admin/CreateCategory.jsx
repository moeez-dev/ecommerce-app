import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { get } from 'mongoose'
import CategoryForm from '../../components/form/CategoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setcategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getAllCategories()
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong in input form')
        }
    }


    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`,)
            if (data.success) {
                setcategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong in getting category')
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    // update
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setVisible(false)
                setUpdatedName('')
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //deleting
    const handleDelete = async (pID) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/category/delete-category/${pID}`)
            if (data.success) {
                toast.success(`category is deleted`)

                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <Layout title={'create category admin'} >
            <div className="row">
                <div className="col-md-3"><AdminMenu /></div>
                <div className="col-md-9 mt-5">
                    <h1 className='text-center' >manage category</h1>
                    <div className='w-50 m-auto p-3'>
                        <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />

                    </div>
                    <div className='w-75 m-auto'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">name</th>
                                    <th scope="col">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories?.map((category, index) => (
                                        <tr key={index}>
                                            <td>{category.name}</td>
                                            <td><button className='btn btn-primary mx-2' onClick={() => { setVisible(true); setUpdatedName(category.name); setSelected(category) }}  >edit</button>
                                                <button className='btn btn-danger mx-2' onClick={() => handleDelete(category._id)} >delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>

                    </div>
                    <Modal onCancel={() => setVisible(false)} visible={visible} footer={null} >
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />

                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
