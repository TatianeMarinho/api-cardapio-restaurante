import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AppError } from '../errors/app-error';
import { Errors } from '../errors/errorMessages';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/Update-product.dto';

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

    public create(req: Request, res: Response): void {
        const data: CreateProductDTO = req.body;

        const newProduct = this.productService.create(data);

        res.status(201).json(newProduct);
    }

    public update(req: Request, res: Response): void {
        const id = Number(req.params.id);

        if(Number.isNaN(id)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode
            );
        }

        const data: UpdateProductDTO = req.body;

        const updatedProduct = this.productService.update(id, data);

        res.json(updatedProduct);
    }
}