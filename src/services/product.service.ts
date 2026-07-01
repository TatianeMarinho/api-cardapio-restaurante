import { Product } from "../types/product";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
    private productRepository = new ProductRepository();

    public findAll(): Product[] {
        return this.productRepository.findAll();
    }
}