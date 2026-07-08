# 🍽️  API Cardápio Restaurante
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Projeto desenvolvido com foco em aprendizado e boas práticas de desenvolvimento Back-end, simulando a construção de uma API REST para gerenciamento do cardápio de um restaurante (Bar do Peixe).

## 🎯 Objetivos

- Desenvolver uma API REST utilizando Node.js e Express
- Aplicar os conceitos de TypeScript em um projeto real (Discriminated Unions, Omit, Extract)
- Praticar arquitetura em camadas (MVC/Repository Pattern)
- Implementar Middlewares para validação de dados e tratamento centralizado de erros
- Simular integração com banco de dados em memória utilizando dados reais de negócio
- Evoluir posteriormente para PostgreSQL e nuvem (Azure)
- Utilizar Git e GitHub seguindo boas práticas

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Git
- GitHub
- REST API
- Thunder Client / Postman

## 📁 Estrutura do Projeto

```text
api_cardapio_restaurante/
│
├── src/
│   ├── controllers/
│   ├── data/
│   ├── dtos/
│   ├── errors/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── types/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 🏗️ Arquitetura

Cada camada possui uma responsabilidade específica, favorecendo baixo acoplamento, maior organização do código e facilidade de manutenção.

Cliente
   │
   ▼
Routes (com Middlewares de Validação)
   │
   ▼
Controllers
   │
   ▼
Services (Regras de Negócio)
   │
   ▼
Repositories
   │
   ▼
Data (temporário em memória)

Erros lançados em qualquer camada
           │
           ▼
Error Middleware (Tratamento Centralizado com AppError)

## 📡 Endpoints

### Produtos

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /produtos | Lista todos os produtos do cardápio |
| GET | /produtos/:id | Busca um produto específico por ID |
| POST | /produtos | Cadastra um novo produto (Comida ou Bebida) |
| PUT | /produtos/:id | Atualiza um produto por completo |
| PATCH | /produtos/:id | Atualiza dados parciais de um produto |
| DELETE | /produtos/:id | Remove um produto do cardápio |

### Variações de Produtos

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /produtos/:id/variations | Lista todas as variações de um produto |
| GET | /produtos/:id/variations/:variationId | Busca uma variação específica de um produto |
| POST | /produtos/:id/variations | Cadastra uma nova variação em um produto existente |
| PUT | /produtos/:id/variations/:variationId | Atualiza uma variação existente por completo |
| PATCH | /produtos/:id/variations/:variationId | Atualiza dados parciais de uma variação |
| DELETE | /produtos/:id/variations/:variationId | Remove uma variação de um produto |

## 🛡️ Middlewares e Validações

- **`errorMiddleware`**: Captura e padroniza erros conhecidos (`AppError`) e exceções inesperadas da aplicação.
- **`validateCreateProductMiddleware`**: Garante que a criação de produtos contenha todos os campos obrigatórios.
- **`validatePatchProductMiddleware`**: Valida atualizações parciais de produtos.
- **`validateVariationPayloadMiddleware`**: Garante a integridade dos dados, impedindo que campos de Produtos (como `category`, `subcategory`, `description`) sejam injetados indevidamente no cadastro/atualização de variações.

## ⚙️ Status do Desenvolvimento

- [x] Listar todos os produtos
- [x] Buscar produto por ID
- [x] Cadastrar produto
- [x] Atualizar produto (PUT)
- [x] Atualizar parcialmente produto (PATCH)
- [x] Remover produto
- [x] Listar variações de um produto
- [x] Buscar variação por ID
- [x] Cadastrar variação isolada
- [x] Atualizar variação (PUT)
- [x] Atualizar parcialmente variação (PATCH)
- [x] Remover variação
- [x] Tratamento global de erros e middlewares de validação de payload

## Modelagem do domínio

Os produtos podem possuir variações, permitindo representar diferentes tamanhos, sabores, volumes e preços de um mesmo item do cardápio (atendendo perfeitamente a regras de negócio reais, como variação de postas de peixe ou volumes de bebidas).

Essa modelagem foi planejada para permitir a evolução da API, facilitando a implementação de pedidos, controle de estoque, relatórios de vendas e integração com bancos de dados relacionais.

## 📦 Exemplos de Modelagem (JSON)

### Produto do tipo Comida (com variações de quantidade/tamanho)
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
### Produto do tipo Bebida (com variações de marca/volume)

```json
{
  "id": 2,
  "name": "Refrigerante Coca-Cola",
  "category": "bebida",
  "subcategory": "refrigerante",
  "description": "Refrigerantes disponíveis",
  "available": true,
  "variations": [
    {
      "id": "2-001",
      "brand": "Coca-Cola",
      "volume": "350 ml",
      "price": 8,
      "available": true
    }
  ]
}
```

## Próximos Passos

- Módulo de Pedidos (Orders) e Carrinho
- Integração com Banco de Dados Relacional (PostgreSQL)
- Conteinerização com Docker
- Implantação e Hospedagem na Nuvem (Microsoft Azure)
- Testes automatizados (Unitários e de Integração com Jest)

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