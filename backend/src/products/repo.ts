import * as _ from 'ramda';
import axios, { AxiosResponse } from 'axios';
import { Either, left, right } from 'fp-ts/lib/Either';
import { Product, ProductError } from './types';

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 1000
});

export const fetchAllProducts = async (): Promise<Either<ProductError, Product[]>> => {
    const products: AxiosResponse  = await axiosInstance.get('/products');
    if(_.isEmpty(products) || _.isNil(products)) return left('noProducts');
    return right(products.data);
}

export const fetchProductById = async (productId: string): Promise<Either<ProductError, Product>> => {
    const products: AxiosResponse  = await axiosInstance.get(`/products/${productId}`);
    if(_.isEmpty(products) || _.isNil(products)) return left('productNotFound');
    return right(products.data);
}