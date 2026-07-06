import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateCreateProductMiddleware } from '../middlewares/validate-create-product.middleware';
import { validatePatchProductMiddleware } from '../middlewares/validade-patch-product.middleware';

const productRoutes = Router();

const productController = new ProductController(); //intancia da classe ProductController

productRoutes.get("/", (req, res) => {
    productController.findAll(req, res); //chama o método findAll da classe ProductController
});

productRoutes.get("/:id", (req, res) => {
    productController.findById(req, res); //chama o método findById da classe ProductController
})

productRoutes.post("/", validateCreateProductMiddleware, (req, res) => {
    productController.create(req, res); //chama o método create da classe ProductController
});

productRoutes.put("/:id", validateCreateProductMiddleware, (req, res) =>{
    productController.update(req, res);
});

productRoutes.delete("/:id", (req, res) => {
    productController.delete(req, res);
})

productRoutes.patch("/:id", validatePatchProductMiddleware, (req, res) => {
    productController.patch(req, res);
});

export default productRoutes;

//configura as rotas de produtos da aplicação/express