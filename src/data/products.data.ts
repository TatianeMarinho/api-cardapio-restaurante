import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Corvina",
    category: "comida",
    subcategory: "peixe_frito",
    description:
      "Acompanha arroz, pirão, molho de camarão, salada, camarão e aipim frito",
    available: true,
    variations: [
      {
        id: "1-001",
        name: "3 postas",
        price: 98,
        quantity: 3,
        available: true,
      },
      {
        id: "1-002",
        name: "6 postas",
        price: 196,
        quantity: 6,
        available: true,
      },
      {
        id: "1-003",
        name: "9 postas",
        price: 294,
        quantity: 9,
        available: true,
      },
    ],
  },
  {
    id: 2,
    name: "Refrigerante Coca-Cola",
    category: "bebida",
    subcategory: "refrigerante",
    description: "Refrigerantes disponíveis",
    available: true,
    variations: [
      {
        id: "2-001",
        brand: "Coca-Cola",
        volume: "350 ml",
        price: 8,
        available: true,
      },
      {
        id: "2-002",
        brand: "Coca-Cola",
        volume: "2 l",
        price: 16,
        available: true,
      },
    ],
  },
];