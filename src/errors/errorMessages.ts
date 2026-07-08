export const Errors = {

  // ===================
  // Produtos
  // ===================

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

  REQUIRED_PRODUCT_VARIATIONS: {
    message: "As variações do produto são obrigatórias",
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

  INVALID_PRODUCT_VARIATIONS_TYPE: {
    message: "As variações do produto devem ser uma lista",
    statusCode: 400,
  },

  INVALID_PRODUCT_DESCRIPTION_TYPE: {
    message: "A descrição do produto deve ser um texto",
    statusCode: 400,
  },

  INVALID_PRODUCT_PRICE_TYPE: {
    message: "O preço do produto deve ser um número",
    statusCode: 400,
  },

  INVALID_PRODUCT_PRICE_VALUE: {
    message: "O preço do produto deve ser maior que zero",
    statusCode: 400,
  },

  INVALID_PRODUCT_CATEGORY_VALUE: {
    message: "A categoria do produto é inválida",
    statusCode: 400,
  },

  NO_FIELDS_TO_UPDATE: {
    message: "Informe ao menos um campo para atualização.",
    statusCode: 400,
  },

  // ===================
  // Variações
  // ===================

  VARIATION_NOT_FOUND: {
    message: "Variação não encontrada",
    statusCode: 404,
  }

};