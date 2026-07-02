export type ProductCategory = 
| "refeição"
| "prato_feito"
| "porção"
| "peixe_viagem"
| "massa"
| "quentinha"
| "adicional"
| "bebida";

export type Product = {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    description: string;
    available: boolean;
    serves?: number;
    protionQuantity?: number;
    unit?: "unidade" | "porção" | "meia_porção" | "postas" | "ml";
    notes?: string;
};
