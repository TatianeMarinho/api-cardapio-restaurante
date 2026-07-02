import { DrinkProduct, DrinkVariation, FoodProduct, FoodVariation, ProductCategory, ProductSubcategoryDrink, ProductSubcategoryFood } from "../types/product";

export type CreateFoodProductDTO = {
    name: string;
    category: Extract<ProductCategory, "comida" | "sobremesa" | "viagem">;
    subcategory: ProductSubcategoryFood;
    description: string;
    variations: FoodVariation[];
    isFavorite?: boolean;
    availableForDelivery?: boolean;
    notes?: string;
}

export type CreateDrinkProductDTO = {
    name: string;
    category: "bebida";
    subcategory: ProductSubcategoryDrink;
    description: string;
    variations: DrinkVariation[];
    isFavorite?: boolean;
    availableForDelivery?: boolean;
    notes?: string;
}

export type CreateProductDTO = CreateFoodProductDTO | CreateDrinkProductDTO;

export type CreateFoodVariationDTO = Omit<FoodVariation, "id">; 

export type CreateDrinkVariationDTO = Omit<DrinkVariation, "id">;