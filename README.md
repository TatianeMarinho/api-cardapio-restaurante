# 🍽️  API Cardápio Restaurante
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Projeto desenvolvido com foco em aprendizado e boas práticas de desenvolvimento Back-end, simulando a construção de uma API REST para gerenciamento do cardápio de um restaurante.

## 🎯 Objetivos

- Desenvolver uma API REST utilizando Node.js e Express
- Aplicar os conceitos de TypeScript em um projeto real
- Praticar arquitetura em camadas
- Simular integração com banco de dados
- Evoluir posteriormente para PostgreSQL
- Utilizar Git e GitHub seguindo boas práticas

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Git
- GitHub
- REST API
- Thunder Client

## 📁 Estrutura do Projeto

api_cardapio_restaurante/
│
├── src/
|   ├── controllers/
|   ├── data/
|   ├── dtos/
|   ├── errors/
|   ├── middlewares/
|   ├── repositories/
|   ├── routes/
|   ├── services/
|   ├── types/
│   |
│   ├── app.ts
│   ├── server.ts
│
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md

## 🏗️ Arquitetura

Cada camada possui uma responsabilidade específica, favorecendo baixo acoplamento, maior organização do código e facilidade de manutenção.

Cliente
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Data (temporário)

Erros lançados em qualquer camada
           │
           ▼
Error Middleware

## 📡 Endpoints

### Produtos

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /produtos | Lista todos os produtos |
| GET | /produtos/:id | Busca um produto por ID |
| POST | /produtos | Cadastra um novo produto |
| PUT | /produtos/:id | Atualiza um produto |
| DELETE | /produtos/:id | Remove um produto |

## Funcionalidades

### Modelagem do domínio

Os produtos podem possuir variações, permitindo representar diferentes tamanhos, sabores, volumes e preços de um mesmo item do cardápio.

Essa modelagem foi planejada para permitir a evolução da API, facilitando a implementação de pedidos, controle de estoque, relatórios de vendas e integração com banco de dados relacionais.

### Produtos

- [x] Listar todos os produtos
- [x] Buscar produto por ID
- [x] Cadastrar produto
- [x] Atualizar produto (PUT)
- [x] Atualizar parcialmente produto (PATCH)
- [x] Remover produto

## 📦 Exemplo de Produto

```json
{
  "id": 1,
  "name": "Corvina",
  "category": "comida",
  "subcategory": "peixe_frito",
  "description": "Acompanha arroz, pirão, molho de camarão...",
  "available": true,
  "variations": [
    {
      "id": "1-001",
      "name": "3 postas",
      "price": 98,
      "quantity": 3,
      "available": true
    }
  ]
}
```

## Próximos Passos

- Cadastro de variações
- Atualização de variações
- Exclusão de variações
- Pedidos
- Integração com PostgreSQL
- Docker
- Testes automatizados

## ▶️ Como executar

Clone o repositório:

```bash
git clone https://github.com/TatianeMarinho/api-cardapio-restaurante.git
```

Entre na pasta:

```bash
cd api-cardapio-restaurante
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```