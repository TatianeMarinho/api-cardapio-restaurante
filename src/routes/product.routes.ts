import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateCreateProductMiddleware } from '../middlewares/validate-create-product.middleware';
import { validatePatchProductMiddleware } from '../middlewares/validate-patch-product.middleware';
import { validateVariationPayloadMiddleware } from '../middlewares/validate-variation.middleware';

const productRoutes = Router();

const productController = new ProductController(); //intancia da classe ProductController

//===> listagem

//lista todas as variações de um produto
productRoutes.get("/:id/variations", (req, res) => {
    productController.findVariationsByProductId(req,res);
})

//lista uma variaçao especifica de um produto
productRoutes.get("/:id/variations/:variationId", (req, res)=> {
    productController.findVariationById(req, res);
});

// lista todos os produtos
productRoutes.get("/", (req, res) => {
    productController.findAll(req, res); //chama o método findAll da classe ProductController
});

//lista um produto em especifico com suas variaçoes
productRoutes.get("/:id", (req, res) => {
    productController.findById(req, res); //chama o método findById da classe ProductController
});

//===> cadastro

//cadastra nova variação em um produto existente
productRoutes.post("/:id/variations", validateVariationPayloadMiddleware, (req, res) => {
    productController.createVariation(req, res);
});

//cadastra produto novo
productRoutes.post("/", validateCreateProductMiddleware, (req, res) => {
    productController.create(req, res); //chama o método create da classe ProductController
});

//===> atualização

//atualiza uma determinada variação completa
productRoutes.put("/:id/variations/:variationId", validateVariationPayloadMiddleware, (req, res) => {
    productController.updateVariation(req, res);
});

//atualiza determinada variaçao de um produto parcial
productRoutes.patch("/:id/variations/:variationId", validateVariationPayloadMiddleware, (req, res) => {
    productController.updateVariation(req,res);
});

// atualiza determinado produto inteiro
productRoutes.put("/:id", validateCreateProductMiddleware, (req, res) =>{
    productController.update(req, res);
});

//atualiza parte de um determinado produto
productRoutes.patch("/:id", validatePatchProductMiddleware, (req, res) => {
    productController.patch(req, res);
});

//===> exclusão

// deleta uma variação
productRoutes.delete("/:id/variations/:variationId", (req, res) => {
    productController.deleteVariation(req, res);
});

// deleta produto
productRoutes.delete("/:id", (req, res) => {
    productController.delete(req, res);
});

export default productRoutes;

//configura as rotas de produtos da aplicação/express