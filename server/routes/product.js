import express from "express"
import { getProducts, getProductById } from "../controls/product"

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)

export default router