import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AppError } from '../errors/app-error';
import { Errors } from '../errors/errorMessages';

export class ProductController {
    private productService = new ProductService();

    public findAll(req: Request, res: Response): void {

        const products = this.productService.findAll();
        res.json(products);
    }

    public findById(req: Request, res: Response): void {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message, 
                Errors.INVALID_PRODUCT_ID.statusCode
            );
        }

        const productId = this.productService.findById(id);

        res.json(productId);
    }
}