const dotenv = require('dotenv')

const dbConnection = require('../db')
const products = require('./data/products.js')
const Product = require('./models/Product.js')

dotenv.config()

dbConnection()

const importData = async () =>{
    try {
        await Product.deleteMany({})
        await Product.insertMany(products)
        console.log('Data imported successfully!')
        process.exit()
    } catch (error) {
        console.error('Data import failed!')
        process.exit(1)
    }
}

importData()