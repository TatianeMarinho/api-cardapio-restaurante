import { Router } from 'express';

const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        mensagem: "API de Cardápio de Restaurante funcionando!",
    });
});

export default routes;

//configura as rotas da aplicação/express