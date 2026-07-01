import { products } from '../data/products.data';
import { Product } from '../types/product';

export class ProductRepository {
    public findAll(): Product[] {
        return products;
    }
}