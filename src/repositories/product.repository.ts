import { products } from '../data/products.data';
import { Product } from '../types/product';
import { CreateProductDTO } from '../dtos/create-product.dto';

export class ProductRepository {

    public findAll(): Product[] {
        return products;
    }

    public findById(id: number): Product | undefined {
        return products.find(product => product.id === id); //percorre o array e acha o primeiro elemento que satisfaça a condição
    }

    public create(data: CreateProductDTO): Product {
        const newProduct: Product = {
            id: products.length + 1,
            name: data.name,
            category: data.category,
            price: data.price,
            description: data.description,
            available: true,
        }

        products.push(newProduct);

        return newProduct;
    }
}