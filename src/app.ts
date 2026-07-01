import express from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json()); //middleware para interpretar o corpo das requisições como JSON

app.use(routes);//configura as rotas da aplicação/express

export default app;

//configura a aplicação/express