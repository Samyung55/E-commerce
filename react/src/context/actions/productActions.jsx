import axios from 'axios'

export const getProducts = async () => {
    try {

        const {data} = await axios.get('http://localhost:4000/api/products')

        return data

    } catch (error) {

        console.error(error)
    }
}

export const getProductDetails = async (id) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/api/products/${id}`)

        return data 

    } catch (error) {
        console.error(error)
    }
}