import slugify from "slugify"
import Category from "../model/categoryModel.js"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'name is required' })
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'category already exists'
            })
        }
        const category = await new Category({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new category created',
            category
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in create category',
            error
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        if (!id || !name) {
            return res.status(404).send({ message: "please enter name" })
        }
        const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'category updated successfully',
            category
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in update category',
            error
        })
    }
}

// get all category
export const categoryController = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).send({
            success: true,
            message: 'all categories list',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'error in get category',
            error
        })
    }
}


//get single category

export const singleCategoryController = async (req, res) => {
    try {
        // const { id } = req.params
        // if (!id) {
        //     return res.status(401).send({ message: 'id not found' })
        // }
        const category = await Category.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: 'single category found successfully',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in getting single category",
            error
        })
    }
}

//delete category controller

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'category deleted successfully',
            category
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in deleting category",
            error
        })
    }
}