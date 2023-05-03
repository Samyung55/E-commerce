const express = require('express')
const { getProducts, getProductById } = require("../controls/product")

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)


module.export = router