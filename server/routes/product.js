const express = require('express')
const { products, productsid } = require("../controls/product")

const router = express.Router()

router.get('/products', products)
router.get('/products/:id', productsid)

module.exports = router
