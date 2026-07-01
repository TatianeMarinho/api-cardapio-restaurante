import app from "./app";

const porta = 3000;


app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

//arquivo que inicia a aplicação, importando o app e definindo a porta de escuta do servidor.