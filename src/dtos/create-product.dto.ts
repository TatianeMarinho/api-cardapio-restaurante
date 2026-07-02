import { ProductCategory } from "../types/product";

export type CreateProductDTO = {
    name: string;
    category: ProductCategory;
    price: number;
    description: string;
}