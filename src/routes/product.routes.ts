import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const productRoutes = Router();

const productController = new ProductController(); //intancia da classe ProductController

productRoutes.get("/", (req, res) => {
    productController.findAll(req, res); //chama o método findAll da classe ProductController
});

export default productRoutes;

//configura as rotas de produtos da aplicação/express