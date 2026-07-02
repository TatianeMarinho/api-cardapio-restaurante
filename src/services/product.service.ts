import { Product } from "../types/product";
import { ProductRepository } from "../repositories/product.repository";
import { AppError } from "../errors/app-error";
import { Errors } from "../errors/errorMessages";
import { CreateProductDTO  } from "../dtos/create-product.dto";


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

    public create(data: CreateProductDTO): Product {
        if (!data.name.trim()) {
            throw new AppError(
                Errors.REQUIRED_PRODUCT_NAME.message, 
                Errors.REQUIRED_PRODUCT_NAME.statusCode
            );
        }
        if (!data.category.trim()) {
            throw new AppError(
                Errors.REQUIRED_PRODUCT_CATEGORY.message, 
                Errors.REQUIRED_PRODUCT_CATEGORY.statusCode
            );
        }
        if (!data.description.trim()) {
            throw new AppError(
                Errors.REQUIRED_PRODUCT_DESCRIPTION.message, 
                Errors.REQUIRED_PRODUCT_DESCRIPTION.statusCode
            );
        }
        if (data.price <= 0) {
            throw new AppError(
                Errors.INVALID_PRODUCT_PRICE_VALUE.message, 
                Errors.INVALID_PRODUCT_PRICE_VALUE.statusCode
            );
        }
        return this.productRepository.create(data);
    }
}