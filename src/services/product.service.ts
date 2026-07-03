import { Product } from "../types/product";
import { ProductRepository } from "../repositories/product.repository";
import { AppError } from "../errors/app-error";
import { Errors } from "../errors/errorMessages";
import { CreateProductDTO  } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/Update-product.dto";


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

        // Verifica se todas as variações têm preço maior que zero
        const hasInvalidPrice = data.variations.some(
            (variation) => variation.price <= 0
        );

        if (hasInvalidPrice) {
            throw new AppError(
                Errors.INVALID_PRODUCT_PRICE_VALUE.message, 
                Errors.INVALID_PRODUCT_PRICE_VALUE.statusCode
            );
        }
        return this.productRepository.create(data);
    }

    private validateProductData(data: CreateProductDTO | UpdateProductDTO): void {
        if(!data.name.trim()) {
            throw new AppError(
                Errors.REQUIRED_PRODUCT_NAME.message,
                Errors.REQUIRED_PRODUCT_NAME.statusCode
            );
        }

        if(!data.description.trim()) {
            throw new AppError(
                Errors.REQUIRED_PRODUCT_DESCRIPTION.message,
                Errors.REQUIRED_PRODUCT_DESCRIPTION.statusCode
            );
        }

        const hasInvalidPrice = data.variations.some(
            (variation) => variation.price < 0
        );

        if(hasInvalidPrice) {
            throw new AppError(
                Errors.INVALID_PRODUCT_PRICE_VALUE.message,
                Errors.INVALID_PRODUCT_PRICE_VALUE.statusCode
            );
        }
    }

    public update(id: number, data: UpdateProductDTO): Product {
        this.validateProductData(data);
        
        const product = this.productRepository.update(id, data);

        if(!product) {
            throw new AppError(
                Errors.PRODUCT_NOT_FOUND.message,
                Errors.PRODUCT_NOT_FOUND.statusCode
            );
        }
        return product;
    }

    public delete(id: number): void{
        const deleted = this.productRepository.delete(id);

        if(!deleted) {
            throw new AppError(
                Errors.PRODUCT_NOT_FOUND.message,
                Errors.PRODUCT_NOT_FOUND.statusCode
            );
        }
    }
}