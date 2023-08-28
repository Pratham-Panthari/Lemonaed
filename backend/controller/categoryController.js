const Category = require('../model/Category')
const slugify = require('slugify')
const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(500).send({message: 'Name is required'})
        }
        const exists = await Category.findOne({ name })
        if(exists) {
            return res.status(401).send({message: 'category already exists'})
        }
        const category = await Category.create({name, slug:slugify(name)})
        res.status(200).send({
            status: 'success',
            message: 'Category Created Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Cannot Create category',
            error,
        })
    }
    
}

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const category = await Category.findByIdAndUpdate(req.params.id, {name, slug: slugify(name)}, {new: true})
        if(!category){
            return res.status(400).send({message: 'category does not exists'})
        }
        
        res.status(200).send({
            status:'success',
            message: 'Updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Unable to Update',
            error
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const slug = req.params.slug
        const category = await Category.findOne({slug})
         
        
        if(!category){
            return res.status(400).send({message: 'category not found'})
        }
        res.status(200).send({
            status: 'success',
            message: 'Fetch Complete',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Unable to fetch category',
            error
        })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).send({
            status: 'success',
            message: ['All categories fetched'],
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Unable to fetch category',
            error
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        if(!category){
            return res.status(400).send({message: 'category does not exists'})
        }
        res.status(200).send({
            status: 'success',
            message: 'deleted successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Unable to delete category',
            error
        })
    }
}

module.exports = { createCategoryController, updateCategory, getCategory, getAllCategory, deleteCategory }