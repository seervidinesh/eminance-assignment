import { Either, right, left, isLeft } from 'fp-ts/lib/Either';
import * as repo from './repo';
import { Product, ProductError } from './types';


export interface ProductInterface {
    getAllProducts(): Promise<Either<ProductError, Product[]>>;
    getProductById(productId: string): Promise<Either<ProductError, Product>>;
}

export class ProductHandler implements ProductInterface {
    async getAllProducts(): Promise<Either<ProductError, Product[]>> {
        try {
            const products = await repo.fetchAllProducts();
            if(isLeft(products)) return left(products.left);
            return right(products.right);
        } catch (error: any) {
            return left('noProducts');
        }
    }
    async getProductById(productId: string): Promise<Either<ProductError, Product>> {
        try {
            const product = await repo.fetchProductById(productId);
            if(isLeft(product)) return left(product.left);
            return right(product.right);
        } catch (error) {
            return left('productNotFound');
        }
    }
}