const express = require('express');
const Product = require('../models/Product');


const products = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const productsid = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { products, productsid };
