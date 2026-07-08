import { products } from '../data/products.data';
import { DrinkProduct, DrinkVariation, FoodProduct, FoodVariation, Product } from '../types/product';
import { CreateDrinkVariationDTO, CreateFoodVariationDTO, CreateProductDTO, UpdateDrinkVariationDTO, UpdateFoodVariationDTO, UpdateVariationDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { PatchProductDTO } from '../dtos/patch-product.dto';
import { AppError } from '../errors/app-error';
import { Errors } from '../errors/errorMessages';

type VariationSearchResult = {
    product: Product;
    variationIndex: number;
}

export class ProductRepository {

    // ===================
    // Auxiliares
    // ===================

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

    private findVariationIndexById(
        productId:number,
        variationId: string,
    ): VariationSearchResult | undefined {
        
        const product = this.findById(productId);

        if (!product) {
            return undefined;
        };

        const variationIndex = product.variations.findIndex(
            variation => variation.id === variationId
        );

        if (variationIndex === -1) {
            return undefined;
        };

        return {
            product,
            variationIndex,
        };
    }

    // ===================
    // Produtos
    // ===================

    public findAll(): Product[] {
        return products;
    }

    public findById(id: number): Product | undefined {
        return products.find(product => product.id === id); //percorre o array e acha o primeiro elemento que satisfaça a condição
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

        if(productIndex === -1 || !products[productIndex]) {
            return undefined;
        }

        if (data.category === "bebida") {
            const variations = this.generateCreateVariations(data.variations, id) as DrinkVariation[];

            const updateProduct: DrinkProduct = {
                ...data,
                id,
                available: products[productIndex].available,
                variations,
            };
            products[productIndex] = updateProduct;
            return updateProduct;
        } else {
            const variations = this.generateCreateVariations(data.variations, id) as FoodVariation[];

            const updateProduct: FoodProduct = {
                ...data,
                id,
                available: products[productIndex].available,
                variations,
            };
            products[productIndex] = updateProduct;
            return updateProduct;
        }

        
    } 

    public delete(id: number): boolean {
        const productIndex = products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            return false;
        }

        products.splice(productIndex, 1);

        return true;
    }

    public patch(id:number, data: PatchProductDTO): Product | undefined {
        const productIndex = products.findIndex((product) => product.id === id);

        if(productIndex === -1) {
            return undefined;
        }

        const currentProduct = products[productIndex];

        if(!currentProduct) {
            return undefined;
        }

        if (currentProduct.category === "bebida") {
            const patchedProduct: DrinkProduct = {
                ...currentProduct,
                ...data,
            } as DrinkProduct;

            products[productIndex] = patchedProduct;
            return patchedProduct;
        } else {
            const patchedProduct: FoodProduct = {
                ...currentProduct,
                ...data,
            } as FoodProduct;

            products[productIndex] = patchedProduct;
            return patchedProduct;

        };        
    }

    // ===================
    // Variações
    // ===================

    //lista todos as variaçoes de um produto
    public findVariationsByProductId(id: number) {
        const product = this.findById(id);

        if (!product) {
            return undefined;
        }

        return product.variations;
    }

    //pega variaçao e filtra por um tipo da variaçao especifico
    public findVariationById(
        productId: number,
        variationId: string
    ): FoodVariation | DrinkVariation {
        const result = this.findVariationIndexById(productId, variationId);

        if (!result) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        const variation = result.product.variations[result.variationIndex];

        if (!variation) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        return variation;
    }

    //cadastrar variação
    public createVariation(productId: number, data: CreateFoodVariationDTO | CreateDrinkVariationDTO): FoodVariation | DrinkVariation {
        const product = this.findById(productId); //procura se o produto existe

        if (!product) { //se o produto nao existe retorna undefind
            throw new AppError(
                Errors.PRODUCT_NOT_FOUND.message,
                Errors.PRODUCT_NOT_FOUND.statusCode,
            )
        }

        const nextId = this.generateVariationId(productId, product.variations); // cria o id da variação

        if (product.category === "bebida"){
            const newVariation: DrinkVariation = {
                ...(data as CreateDrinkVariationDTO), 
                id: nextId,
                available: true
            };

            product.variations.push(newVariation);
            return newVariation;

        } else {
            const newVariation: FoodVariation = {
                ...(data as CreateFoodVariationDTO), 
                id: nextId,
                available: true
            };

            product.variations.push(newVariation);
            return newVariation;
        }

        
    }

    //atualizar variação existente
    public updateVariation(
        productId: number,
        variationId: string,
        data: UpdateVariationDTO
    ): FoodVariation | DrinkVariation {
        
        const result = this.findVariationIndexById(productId, variationId);

        if (!result) {
            throw new AppError(
                Errors.VARIATION_NOT_FOUND.message,
                Errors.VARIATION_NOT_FOUND.statusCode,
            );
        }

        const { product, variationIndex } = result;

        //atualiza o item na lista de produto
        if(product.category === "bebida") {
            const currentVariation = product.variations[variationIndex] as DrinkVariation;//seleciono a variação

            if (!currentVariation) {
                throw new AppError(
                    Errors.VARIATION_NOT_FOUND.message,
                    Errors.VARIATION_NOT_FOUND.statusCode,
                );
            }
            //mescla os antigos com os novos mantendo o id original
            const updatedVariation: DrinkVariation= {
                ...currentVariation,
                ...(data as UpdateDrinkVariationDTO), 
                id: variationId,
            };

            product.variations[variationIndex] = updatedVariation;
            return updatedVariation

        } else {
            const currentVariation = product.variations[variationIndex] as FoodVariation;//seleciono a variação

            if (!currentVariation) {
                throw new AppError(
                    Errors.VARIATION_NOT_FOUND.message,
                    Errors.VARIATION_NOT_FOUND.statusCode,
                );
            }
            //mescla os antigos com os novos mantendo o id original
            const updatedVariation: FoodVariation= {
                ...currentVariation,
                ...(data as UpdateFoodVariationDTO), 
                id: variationId,
            };

            product.variations[variationIndex] = updatedVariation;
            return updatedVariation
        }
    }

    //deletar variaçao existente
    public deleteVariation(productId: number, variationId: string): boolean {
        const result = this.findVariationIndexById(productId, variationId);

        if(!result) {
            return false;
        }

        const { product, variationIndex, } = result;

        product.variations.splice(variationIndex, 1);
        return true;
    }
}