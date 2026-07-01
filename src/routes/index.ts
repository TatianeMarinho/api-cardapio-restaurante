import { Router } from 'express';
import productRoutes from './product.routes';

const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        mensagem: "API de Cardápio de Restaurante funcionando!",
    });
});

routes.use("/produtos", productRoutes);

export default routes;

//configura as rotas da aplicação/express