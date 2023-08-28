const express = require('express')
const {loginRequire, isAdmin} = require('../middlewear/authMiddlewear')
const { createCategoryController, updateCategory, getCategory, getAllCategory, deleteCategory } = require('../controller/categoryController')
const router = express.Router()

router.post('/create-category', loginRequire, isAdmin, createCategoryController)

router.put('/update-category/:id', updateCategory)

router.get('/get-category/:slug', getCategory)

router.get('/get-all-category', getAllCategory)

router.delete('/delete-category/:id', loginRequire, isAdmin, deleteCategory)

module.exports = router