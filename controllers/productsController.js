const express = require('express')
const controller = express.Router()

const {authorize} = require('../middlewares/authorization')
const productSchema = require('../schemas/productSchema')

// unsecured routes
controller.route('/').get(async (req, res) => {
    try {
        res.status(200).json(await productSchema.find())
    } catch {
        res.status(400).json()
    }
})

controller.route('/product/:_id').get(async (req, res) => {
    const product = await productSchema.findById({_id: req.params._id})
    if(product)
        res.status(200).json(product)
    else
        res.status(400).json()
})

controller.route('/:_tag').get(async (req, res) => {
    const products = await productSchema.find({_tag: req.params._tag})
    if(products)
        res.status(200).json(products)
    else
        res.status(400).json()
})

controller.route('/:_tag/:take').get(async (req, res) => {
    const products = await productSchema.find({_tag: req.params._tag}).limit(req.params.take)
    if(products)
        res.status(200).json(products)
    else
        res.status(400).json()
})


// secured routes
controller.route('/').post(authorize, async (req, res) => {
    const {_tag, _imageName, _name, _category, _description, _rating, _price} = req.body

    if (!_name || !_price)
        res.status(400).json({text: 'name and price is required'})

    const item_exist = await productSchema.findOne({_name})
    if (item_exist)
        res.status(409).json({text: 'a product with the same name is already exist'})
    else {
        const product = await productSchema.create({
            _category,
            _description,
            _imageName,
            _name,
            _price,
            _rating,
            _tag
        })

        if (product)
            res.status(201).json({text: `product with id ${product._id} is succesfully created`})
        else
            res.status(400).json({text: 'something went wrong'})
    }
})

controller.route('/product/:_id') .put(async (req, res) => {
    const {_tag, _imageName, _name, _category, _description, _rating, _price} = req.body

    const product = await productSchema.updateOne(
        {_id: req.params._id},
        {$set: req.body}
    )

    if (product)
        res.status(201).json({text: `product with id ${req.params._id} is succesfully updated`})
    else
        res.status(400).json({text: 'something went wrong'})
})

controller.route('/product/:_id') .delete(async (req, res) => {
    if (!req.params._id)  
        res.status(400).json('no artcilenumber was specified')
    else  {
        const item = await productSchema.findById(req.params._id)
        if (item) {
            await productSchema.remove(item)
            res.status(200).json({text: `product with ID - ${req.params._id} is deleted successfully`})
        } else {
            res.status(404).json({text: `product with ID - ${req.params._id} is not found`})
        }
    }
})



module.exports = controller