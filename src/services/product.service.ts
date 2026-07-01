import { Product } from "../types/product";
import { ProductRepository } from "../repositories/product.repository";
import { AppError } from "../errors/app-error";
import { Errors } from "../errors/errorMessages";


export class ProductService {
    private productRepository = new ProductRepository();

    public findAll(): Product[] {
        return this.productRepository.findAll();
    }

    public findById(id: number): Product {
        const productId = this.productRepository.findById(id);

        if (!productId) {
            throw new AppError(Errors.PRODUCT_NOT_FOUND.message, Errors.PRODUCT_NOT_FOUND.statusCode);
        }

        return productId;
    }
}