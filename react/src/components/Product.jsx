import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Product.css';

import * as actionTypes from '../context/utils/product';
import { getProducts } from '../context/actions/productActions';
import { useProductContext } from '../context/contexts/productContext';

const Product = () => {
  const { productState, dispatch } = useProductContext();
  const { products, isLoading, error } = productState;

  const fetchProducts = async () => {
    try {
      dispatch({ type: actionTypes.GET_PRODUCT_REQUEST });

      const result = await getProducts();

      dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: result });
    } catch (error) {
      console.error(error);

      dispatch({
        type: actionTypes.GET_PRODUCT_FAIL,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = (product) => {
    const { name, description, imageUrl, price, _id} = product;

    return (
        <div className="product" key={_id}>
        <img src={imageUrl} alt="product" />
        <div className="product__info">
          <p className="info__name">{name}</p>
          <p className="info__description">
            {description.substring(0, 100)}
            ...
          </p>
          <p className="info__price">${price}</p>
          <Link to={`/product/${_id}`} className="info__button">
            View
          </Link>
        </div>
      </div>
    );
  };

  if (isLoading) return <h2>Loading...</h2>;

  if (error) throw error;

  return <>{products && products.map(renderItem)}</>;
};

export default Product;
