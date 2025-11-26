# Projeto AeroCode - Sistema de Gestao de Producao de Aeronaves

Sistema completo para gestao de producao de aeronaves com frontend React e backend Node.js/TypeScript.

## Tecnologias Utilizadas

### Frontend
- React 18 + Vite
- React Router DOM
- Axios
- CSS Modules

### Backend
- Node.js + TypeScript
- Express.js
- Prisma ORM
- MySQL
- bcryptjs (autenticacao)
- JSON Web Token (JWT)

## Estrutura do Projeto

```
AV3/
├── backend/                 # API REST
│   ├── prisma/
│   │   └── schema.prisma   # Modelo de dados
│   └── src/
│       ├── controllers/    # Controladores HTTP
│       ├── services/       # Logica de negocio
│       ├── routes/         # Rotas da API
│       ├── middlewares/    # Middlewares (auth, timing)
│       └── lib/            # Cliente Prisma
├── src/                    # Frontend React
├── public/
└── relatorio/              # Documentacao PDF
```

## Pre-requisitos

- Node.js 18+
- MySQL 8.0+
- npm ou yarn

## Como Rodar o Projeto

### 1. Clone o repositorio

```bash
git clone https://github.com/EnzoGabrielCode/AV3
cd AV3
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

### 3. Configure o banco de dados

Crie um arquivo `.env` na pasta `backend/` com:

```env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/aerocode"
JWT_SECRET="sua_chave_secreta_jwt"
PORT=3001
```

### 4. Execute as migracoes do Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Inicie o Backend

```bash
npm run dev
```

O backend estara disponivel em `http://localhost:3001`

### 6. Configure o Frontend

Em outro terminal, na raiz do projeto:

```bash
npm install
npm run dev
```

O frontend estara disponivel em `http://localhost:5173`

## Endpoints da API

### Autenticacao
- `POST /api/auth/login` - Login de usuario
- `POST /api/auth/register` - Registro de usuario

### Aeronaves
- `GET /api/aeronaves` - Listar todas
- `GET /api/aeronaves/:id` - Buscar por ID
- `POST /api/aeronaves` - Criar nova
- `PUT /api/aeronaves/:id` - Atualizar
- `DELETE /api/aeronaves/:id` - Deletar
- `GET /api/aeronaves/stats` - Estatisticas

### Producao
- `GET /api/producao` - Listar producoes
- `POST /api/producao` - Iniciar producao
- `PUT /api/producao/:id/etapa` - Avancar etapa
- `GET /api/producao/stats` - Estatisticas

### Pecas
- `GET /api/pecas` - Listar pecas
- `POST /api/pecas` - Criar peca
- `PUT /api/pecas/:id/instalar` - Instalar peca

### Etapas
- `GET /api/etapas` - Listar etapas
- `PUT /api/etapas/:id/reordenar` - Reordenar

### Funcionarios
- `GET /api/funcionarios` - Listar funcionarios
- `POST /api/funcionarios` - Criar funcionario

### Testes
- `GET /api/testes` - Listar testes
- `POST /api/testes` - Criar teste
- `PUT /api/testes/:id/resultado` - Registrar resultado

## Perfis de Usuario

| Perfil | Permissoes |
|--------|------------|
| Admin | Acesso total ao sistema |
| Engenheiro | Gerenciar aeronaves, etapas e testes |
| Operador | Visualizar e atualizar producao |

## Docker (Opcional)

Para rodar com Docker:

```bash
docker-compose up -d
```

## Compatibilidade

- Windows 10+
- Ubuntu 24.04.03+
- Derivados do Ubuntu

## Documentacao

Consulte o relatorio tecnico em `relatorio/relatorio_aerocode.pdf`

## Autor

Enzo Gabriel - [@EnzoGabrielCode](https://github.com/EnzoGabrielCode)
