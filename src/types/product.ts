export type ProductCategory = 
| "comida"
| "sobremesa"
| "viagem"
| "bebida";

export type ProductSubcategoryFood =
| "peixe_frito"
| "massa"
| "porcao"
| "comercial"
| "pastel"
| "guarnicao"
| "carne"
| "outros";

export type ProductSubcategoryDrink = 
| "refrigerante"
| "suco"
| "cerveja"
| "vinho"
| "energetico"
| "agua"
| "outros";

export type ProductVolume =
| "290 ml"
| "350 ml"
| "500 ml"
| "600 ml"
| "1 l"
| "1,5 l"
| "2 l"
| "copo"
| "jarra"
| "caneca";

export type FoodVariation = {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    flavor?: string;
    available: boolean;
};

export type DrinkVariation = {
    id: string;
    brand: string;
    volume?: ProductVolume;
    price: number;
    quantity?: number;
    available: boolean;
};

export type BaseProduct = {
    id: number;
    name: string;
    category: ProductCategory;
    description: string;
    available: boolean;
    isFavorite?: boolean;
    availableForDelivery?: boolean;
    notes?: string;
};

export type FoodProduct = BaseProduct & {
    category: "comida" | "sobremesa" | "viagem";
    subcategory: ProductSubcategoryFood;
    variations: FoodVariation[];
};

export type DrinkProduct = BaseProduct & {
    category: "bebida";
    subcategory: ProductSubcategoryDrink;
    variations: DrinkVariation[];
};

export type Product = FoodProduct | DrinkProduct;

