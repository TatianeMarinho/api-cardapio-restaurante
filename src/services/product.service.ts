import { DrinkVariation, FoodVariation, Product } from "../types/product";
import { ProductRepository } from "../repositories/product.repository";
import { AppError } from "../errors/app-error";
import { Errors } from "../errors/errorMessages";
import { CreateDrinkVariationDTO, CreateFoodVariationDTO, CreateProductDTO, CreateVariationDTO, UpdateVariationDTO  } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/update-product.dto";
import { PatchProductDTO } from "../dtos/patch-product.dto";


export class ProductService {
    private productRepository = new ProductRepository();

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

    // ===================
    // Produtos
    // ===================

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
        this.validateProductData(data);
        return this.productRepository.create(data);
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

    public patch(id: number, data: PatchProductDTO): Product {
        const patchedProduct = this.productRepository.patch(id, data);

        if (!patchedProduct) {
            throw new AppError(
                Errors.PRODUCT_NOT_FOUND.message,
                Errors.PRODUCT_NOT_FOUND.statusCode,
            );
        }

        return patchedProduct;
    }

    // ===================
    // Variações
    // ===================


    public findVariationsByProductId(id:number): Product["variations"] {
        const variations = this.productRepository.findVariationsByProductId(id);

        if (!variations) {
            throw new AppError(
                Errors.PRODUCT_NOT_FOUND.message,
                Errors.PRODUCT_NOT_FOUND.statusCode,
            );
        }

        return variations;
    }

    public findVariationById(
        productId: number,
        variationId: string,
    ): Product["variations"][number] {

        const variation = this.productRepository.findVariationById(
            productId,
            variationId,
        );

        if(!variation) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        return variation;
    }

    public createVariation(productId: number, data: CreateVariationDTO): FoodVariation | DrinkVariation {
        const product = this.findById(productId);

        if(data.price !== undefined && data.price < 0) {
            throw new AppError(
                Errors.INVALID_PRODUCT_PRICE_VALUE.message,
                Errors.INVALID_PRODUCT_PRICE_VALUE.statusCode,
            );
        }

        if (product.category === "bebida") {
            const drinkData = data as CreateDrinkVariationDTO; // garaantindo que os dados sejam drinkvariation

            return this.productRepository.createVariation(productId, drinkData); 

        } else {
            const foodData = data as CreateFoodVariationDTO; // garante que é do tipo foodVariation

            return this.productRepository.createVariation(productId, foodData);
        }
    }

    public updateVariation(
        productId: number, 
        variationId: string,
        data: UpdateVariationDTO,
    ): FoodVariation | DrinkVariation {

        this.findById(productId);

        if(data.price !== undefined && data.price < 0) {
            throw new AppError(
                Errors.INVALID_PRODUCT_PRICE_VALUE.message,
                Errors.INVALID_PRODUCT_PRICE_VALUE.statusCode,
            );
        }

        return this.productRepository.updateVariation(productId, variationId, data);
    }

    public deleteVariation(ProductId: number, variationId: string): void {
        this.findById(ProductId);

        const deleted = this.productRepository.deleteVariation(ProductId, variationId);

        if(!deleted) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }
    }
}