import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
} from 'express-joi-validation';

export type ProductError =
    | 'noProducts'
    | 'productNotFound'

export interface Product {
    createdAt?: string,
    id: string;
    title: string;
    description: string;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
}

export const productQuerySchema = Joi.object({
    productId: Joi.string().required()
});

export interface ProductQuerySchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
      productId: string
    }
}