import { products } from '../data/products.data';
import { DrinkProduct, DrinkVariation, FoodProduct, FoodVariation, Product } from '../types/product';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/Update-product.dto';

export class ProductRepository {

    public findAll(): Product[] {
        return products;
    }

    public findById(id: number): Product | undefined {
        return products.find(product => product.id === id); //percorre o array e acha o primeiro elemento que satisfaça a condição
    }

    //verifica qual o maior id existente e aumenta 1
    private getNextValue(ids: number[]): number {
        return Math.max(...ids, 0) + 1;
    }

    //verifica o maior valor e retorna o proximo valor de id de product
    private generateProductId(): number {
        return this.getNextValue(products.map(
            (product) => product.id
        ))
    };

    //verifica o maior valor e retorna o proximo valor de id de variation
    private generateVariationId(
        productId: number,
        variations: { id: string }[]
    ): string {
        const variationValues = variations.map(
            (variation) => {
                const[, value] = variation.id.split("-");
                return Number(value);
            }
        );

        const nextValue = this.getNextValue(variationValues);

        return `${productId}-${String(nextValue).padStart(3, "0")}`;
    }

    //verifica o id anterior de variations e aumenta em um criando um novo id
    private generateCreateVariations<T extends object>(
        variations:T[], productId:number
    ): (T & {id:string, available: boolean})[] {
        return variations.map(
            (variation, index) => {
                const variationId = `${productId}-${String(index + 1).padStart(3, "0")}`;

                return {
                    ...variation,
                    id: variationId,
                    available: true,
            };
        });
    }
    
    public create(data: CreateProductDTO): Product {
        const productId = this.generateProductId();

        if (data.category === "bebida") {
            const variations: DrinkVariation[] = this.generateCreateVariations(
                data.variations,
                productId,
            );

            const newProduct: DrinkProduct = {
                ...data,
                id: productId,
                available: true,
                variations,
            };

            products.push(newProduct);
            return newProduct;
        } else {
            
            const variations: FoodVariation[] = this.generateCreateVariations(
                data.variations,
                productId,
            );

            const newProduct: FoodProduct = {
                ...data,
                id: productId,
                available: true,
                variations,
            };

            products.push(newProduct);
            return newProduct;
        }
    }

    public update(id: number, data: UpdateProductDTO): Product | undefined {
        const productIndex = products.findIndex(
            (product) => product.id === id
        );

        if(productIndex === -1) {
            return undefined;
        }

        const currentProduct = products[productIndex];

        //valido que o produto nao é indefinido
        if(!currentProduct) {
            return undefined;
        }

        const updateProduct: Product = {
            ...data,
            id,
            available: currentProduct.available,
        };

        products[productIndex] = updateProduct;
        return updateProduct;
    } 

    public delete(id: number): boolean {
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            return false;
        }

        products.splice(productIndex, 1);

        return true;
    }
}