import { products } from '../data/products.data';
import { Product } from '../types/product';

export class ProductRepository {

    public findAll(): Product[] {
        return products;
    }

    public findById(id: number): Product | undefined {
        return products.find(product => product.id === id); //percorre o array e acha o primeiro elemento que satisfaça a condição
    }
}