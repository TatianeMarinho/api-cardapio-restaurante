import express from 'express';
import routes from './routes/index';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json()); //middleware para interpretar o corpo das requisições como JSON
app.use(routes);//configura as rotas da aplicação/express

app.use(errorMiddleware); //middleware para tratar erros

export default app;

//configura a aplicação/express