import React, { useState, useEffect } from "react";
import "./productcard.style.css";
import { fetchAllProducts } from '../api'

export const ProductCard = ({ user }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const allProducts = await fetchAllProducts();
            if (allProducts.status === 200)
                setProducts(allProducts.data.products);
        } catch (error) {
            console.log('first')
        }
    }

    useEffect(() => {
        try {
            fetchProducts();
        } catch (error) {
            console.log('first')
        }
    }, []);
    return (
        products.map(p => {
            return (
                <a className="product-card" href="#dolce-gabbana-cropped">
                    <img className="product-card__image" src={p.images[0]} />
                    <p className="product-card__brand">{p.title}</p>
                    <p className="product-card__description">{p.description}</p>
                    <p className="product-card__price">Price: {p.price} $</p>
                </a>
            )
        })
    );
};
