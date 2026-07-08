import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AppError } from '../errors/app-error';
import { Errors } from '../errors/errorMessages';
import { CreateProductDTO, CreateVariationDTO, UpdateVariationDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { PatchProductDTO } from '../dtos/patch-product.dto';

export class ProductController {

    // ===================
    // Produtos
    // ===================

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

    public delete(req: Request, res: Response): void {
        const id = Number(req.params.id);

        if(Number.isNaN(id)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            );
        }

        this.productService.delete(id);
        res.status(204).send();
    }

    public patch(req: Request, res: Response): void {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            );
        }

        const data: PatchProductDTO = req.body;

        const patchedProduct = this.productService.patch(id, data);

        res.json(patchedProduct);
    }

    // ===================
    // Variações
    // ===================

    public findVariationsByProductId(req: Request, res: Response): void {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            );
        }

        const variations = this.productService.findVariationsByProductId(id);

        res.json(variations);
    }

    public findVariationById(req: Request, res: Response): void {
        const productId = Number(req.params.id);
        const variationId = req.params.variationId;

        if(Number.isNaN(productId)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            );
        }

        if(!variationId || typeof variationId !== "string" || !variationId.trim()) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        const variation = this.productService.findVariationById(
            productId,
            variationId,
        );

        res.json(variation);
    }

    public createVariation(req: Request, res: Response): void {
        const productId = Number(req.params.id);

        if(Number.isNaN(productId)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            );
        }

        const data: CreateVariationDTO = req.body;

        const newVariation = this.productService.createVariation(productId, data);

        res.status(201).json(newVariation);
    }

    public updateVariation(req: Request, res: Response): void {
        const productId = Number(req.params.id);
        const variationId = req.params.variationId;

        if(Number.isNaN(productId)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            )
        }

        if(!variationId || typeof variationId !== "string" || !variationId.trim()) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        const data: UpdateVariationDTO = req.body;

        const updatedVariation = this.productService.updateVariation(
            productId,
            variationId,
            data,
        );

        res.json(updatedVariation);
    }

    public deleteVariation(req: Request, res: Response): void {
        const productId = Number(req.params.id);
        const variationId = req.params.variationId;

        if(Number.isNaN(productId)) {
            throw new AppError(
                Errors.INVALID_PRODUCT_ID.message,
                Errors.INVALID_PRODUCT_ID.statusCode,
            );
        }

        if(!variationId || typeof variationId !== "string" || !variationId.trim()) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        this.productService.deleteVariation(productId, variationId);

        res.status(204).send();

    }
}