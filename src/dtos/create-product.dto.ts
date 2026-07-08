import { PartialSyncWriter } from "node:stream/iter";
import { DrinkProduct, DrinkVariation, FoodProduct, FoodVariation, ProductCategory, ProductSubcategoryDrink, ProductSubcategoryFood } from "../types/product";

export type CreateFoodProductDTO = {
    name: string;
    category: Extract<ProductCategory, "comida" | "sobremesa" | "viagem">;
    subcategory: ProductSubcategoryFood;
    description: string;
    variations: CreateFoodVariationDTO[];
    isFavorite?: boolean;
    availableForDelivery?: boolean;
    notes?: string;
}

export type CreateDrinkProductDTO = {
    name: string;
    category: "bebida";
    subcategory: ProductSubcategoryDrink;
    description: string;
    variations: CreateDrinkVariationDTO[];
    isFavorite?: boolean;
    availableForDelivery?: boolean;
    notes?: string;
}

export type CreateProductDTO = CreateFoodProductDTO | CreateDrinkProductDTO;

export type CreateFoodVariationDTO = Omit<FoodVariation, "id">; 
export type CreateDrinkVariationDTO = Omit<DrinkVariation, "id">;

export type CreateVariationDTO = CreateDrinkVariationDTO | CreateFoodVariationDTO;

export type UpdateFoodVariationDTO = Partial<CreateFoodVariationDTO>;
export type UpdateDrinkVariationDTO = Partial<CreateDrinkVariationDTO>;

export type UpdateVariationDTO = UpdateDrinkVariationDTO | UpdateFoodVariationDTO;
 