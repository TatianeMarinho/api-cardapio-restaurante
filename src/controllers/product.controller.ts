import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
    private productService = new ProductService();

    public findAll(req: Request, res: Response): void {

        const products = this.productService.findAll();
        res.json(products);
    }
}