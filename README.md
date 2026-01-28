# API com criação e login de usuario, autenticação e confirmação de email 

API REST desenvolvida em **Node.js + Express + MySQL**, com foco em boas práticas de arquitetura, autenticação JWT e confirmação de email via token.


## 📌 Funcionalidades

-  Cadastro de usuários
-  Login com JWT
-  Confirmação de email via link com token
-  Senha criptografada com bcrypt
-  Rotas protegidas por middleware
-  Arquitetura em camadas (MVC + Services)
-  Variáveis de ambiente com dotenv
-  Validações centralizadas com Joi
-  Tratamento global de erros

---

## Arquitetura do Projeto

api/
├── src/
│   ├── config/        # Configurações (DB)
│   ├── controllers/  # Camada HTTP (req/res)
│   ├── errors/       # Erros customizados
│   ├── middlewares/  # Middlewares (auth, error, validation)
│   ├── models/       # Acesso ao banco (MySQL)
│   ├── routes/       # Definição das rotas
│   ├── services/     # Regras de negócio
│   ├── utils/        # Utilitários (email, tokens)
│   ├── validators/  # Validações de dados (Joi)
│   └── app.js        # Configuração do Express
│
├── .env.example      # Exemplo de variáveis de ambiente
├── .gitignore
├── index.js          # Ponto de entrada da aplicação
├── package.json
└── README.md


## 🛠️ Tecnologias Utilizadas

-Node.js
-Express
-MySQL
-mysql2
-token JWT 
-Joi
-bcrypt
-nodemailer
-dotenv
-cors

## ⚙️ Configuração do Ambiente

1️ - Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd api
```
2️ - Instale as dependências
```bash
npm install
```
3 - Configure o .env com suas variaveis de ambiente

4 - Crie e configure o banco de dados executando o SQL localizado em `api/config/schema.sql`

3 - Utilize o nodemon para rodar o servidor
```bash
npx nodemon index.js
```

## 🔐 Rotas Principais

1-Exibe todos os usuarios (rota apenas para exibição do projeto)
`GET /users/`

---

2-Rota de cadastro
`POST /users/cadastro`
Body:
```bash
{
    "nome":"",
    "email":"",
    "senha":""
}
```

---

3 - Rota para confirmação do email (envia automaticamente)
`GET /users/confirm_email?token=SEU_TOKEN`

---

4 - Rota para login(email precisa estar validado)
`POST /users/login`
Body:
```bash
{
    "email":"",
    "senha":""
}
```

5 - Rota para testar o token JWT que retorna no Login, utilizar o Bearer Token
`GET /users/protect`
Bearer Token : Token JWT que retorna no login