const express = require('express')
const { products, productsid } = require("../routes/product")

const router = express.Router()

router.get('/products', products)
router.get('products/:id', productsid)


module.export = router