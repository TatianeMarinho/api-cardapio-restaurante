export const Errors = {
  PRODUCT_NOT_FOUND: {
    message: "Produto não encontrado",
    statusCode: 404,
  },

  INVALID_PRODUCT_ID: {
    message: "ID do produto inválido",
    statusCode: 400,
  },

  REQUIRED_PRODUCT_NAME: {
    message: "O nome do produto é obrigatório",
    statusCode: 400,
  },

  REQUIRED_PRODUCT_CATEGORY: {
    message: "A categoria do produto é obrigatória",
    statusCode: 400,
  },

  REQUIRED_PRODUCT_PRICE: {
    message: "O preço do produto é obrigatório",
    statusCode: 400,
  },

  REQUIRED_PRODUCT_DESCRIPTION: {
    message: "A descrição do produto é obrigatória",
    statusCode: 400,
  },

  INVALID_PRODUCT_NAME_TYPE: {
    message: "O nome do produto deve ser um texto",
    statusCode: 400,
  },

  INVALID_PRODUCT_CATEGORY_TYPE: {
    message: "A categoria do produto deve ser um texto",
    statusCode: 400,
  },

  INVALID_PRODUCT_PRICE_TYPE: {
    message: "O preço do produto deve ser um número",
    statusCode: 400,
  },

  INVALID_PRODUCT_DESCRIPTION_TYPE: {
    message: "A descrição do produto deve ser um texto",
    statusCode: 400,
  },

  INVALID_PRODUCT_PRICE_VALUE: {
    message: "O preço do produto deve ser maior ou igual a zero",
    statusCode: 400,
  },
};