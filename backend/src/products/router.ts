import { Router, Request, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import { isLeft } from 'fp-ts/lib/Either';

import { ProductHandler } from './handler'
import { wrapError } from '../responses/wrapper'
import { authenticate } from '../authentication/domain';
import { Role } from '../authentication/types';
import { ProductQuerySchema, productQuerySchema } from './types';

const router = Router();
const productHandler = new ProductHandler();
const validator = createValidator();

// signup route.
router.get('/', authenticate([Role.Customer]), async (req: Request, res: Response) => {
    const response = await productHandler.getAllProducts();
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.status(200).send(response.right);
});

// User me route.
router.get('/:productId',  validator.params(productQuerySchema), authenticate([Role.Customer]), async (req: ValidatedRequest<ProductQuerySchema>, res: Response) => {
    const response = await productHandler.getProductById(req.params.productId);
    if (isLeft(response)) {
        return res.status(400).send({ error: wrapError(response.left) })
    }
    return res.status(200).send(response.right);
});

export { router };