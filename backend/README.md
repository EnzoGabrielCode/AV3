# AV3 - Sistema de Gestão de Produção de Aeronaves

Backend da aplicação web para gerenciamento completo de produção de aeronaves, construído com Node.js, TypeScript, Express e Prisma ORM.

## Tecnologias

- **Node.js** v20+
- **TypeScript** 5.x
- **Express** 4.x
- **Prisma ORM** 5.x
- **MySQL** 8.x
- **bcryptjs** (autenticação)

## Arquitetura

O projeto segue a arquitetura MVC (Model-View-Controller) com separação clara de responsabilidades:

- **Models**: Definidos no schema Prisma
- **Services**: Contém toda a lógica de negócio e acesso ao banco de dados
- **Controllers**: Gerencia requisições HTTP e validações
- **Routes**: Define os endpoints da API REST

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 20.x ou superior
- npm ou yarn
- MySQL 8.x

## Configuração Local

### 1. Clone o repositório

```bash
git clone https://github.com/EnzoGabrielCode/AV3.git
cd AV3/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados MySQL

Crie um banco de dados MySQL local:

```sql
CREATE DATABASE av3_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais locais:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/av3_database"
PORT=3000
```

Substitua `usuario` e `senha` pelas credenciais do seu MySQL local.

### 5. Execute as migrações do Prisma

```bash
npm run prisma:migrate
```

Ou para desenvolvimento:

```bash
npm run prisma:push
```

### 6. Inicie o servidor

**Modo desenvolvimento (com hot reload):**

```bash
npm run dev
```

**Modo produção:**

```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento com ts-node-dev
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor de produção
- `npm run prisma:migrate` - Cria e aplica migrações do banco de dados
- `npm run prisma:push` - Sincroniza schema Prisma com banco (desenvolvimento)
- `npm run prisma:studio` - Abre interface visual do Prisma Studio
- `npm run prisma:generate` - Gera o Prisma Client

## API Endpoints

### Usuários
- `POST /api/usuarios/registro` - Criar novo usuário
- `POST /api/usuarios/login` - Autenticar usuário
- `GET /api/usuarios` - Listar todos os usuários
- `GET /api/usuarios/:id` - Buscar usuário por ID
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário

### Aeronaves
- `POST /api/aeronaves` - Criar nova aeronave
- `GET /api/aeronaves` - Listar todas as aeronaves
- `GET /api/aeronaves/:id` - Buscar aeronave por ID
- `PUT /api/aeronaves/:id` - Atualizar aeronave
- `DELETE /api/aeronaves/:id` - Deletar aeronave

### Peças
- `POST /api/pecas` - Criar nova peça
- `GET /api/pecas` - Listar todas as peças
- `GET /api/pecas/:id` - Buscar peça por ID
- `PUT /api/pecas/:id` - Atualizar peça
- `DELETE /api/pecas/:id` - Deletar peça
- `GET /api/pecas/aeronave/:aeronaveId` - Listar peças de uma aeronave

### Etapas
- `POST /api/etapas` - Criar nova etapa
- `GET /api/etapas` - Listar todas as etapas
- `GET /api/etapas/:id` - Buscar etapa por ID
- `PUT /api/etapas/:id` - Atualizar etapa
- `DELETE /api/etapas/:id` - Deletar etapa
- `GET /api/etapas/aeronave/:aeronaveId` - Listar etapas de uma aeronave

### Funcionários
- `POST /api/funcionarios` - Criar novo funcionário
- `GET /api/funcionarios` - Listar todos os funcionários
- `GET /api/funcionarios/:id` - Buscar funcionário por ID
- `PUT /api/funcionarios/:id` - Atualizar funcionário
- `DELETE /api/funcionarios/:id` - Deletar funcionário
- `GET /api/funcionarios/cargo/:cargo` - Listar funcionários por cargo

### Testes
- `POST /api/testes` - Criar novo teste
- `GET /api/testes` - Listar todos os testes
- `GET /api/testes/:id` - Buscar teste por ID
- `PUT /api/testes/:id` - Atualizar teste
- `DELETE /api/testes/:id` - Deletar teste
- `GET /api/testes/aeronave/:aeronaveId` - Listar testes de uma aeronave

### Produção
- `POST /api/producao` - Criar nova produção
- `GET /api/producao` - Listar todas as produções
- `GET /api/producao/:id` - Buscar produção por ID
- `PUT /api/producao/:id` - Atualizar produção
- `DELETE /api/producao/:id` - Deletar produção
- `PATCH /api/producao/:id/status` - Atualizar status da produção
- `GET /api/producao/estatisticas` - Obter estatísticas de produção

## Esquema do Banco de Dados

### Entidades Principais

1. **Usuario** - Gerenciamento de usuários e autenticação
2. **Aeronave** - Cadastro de aeronaves (modelo, tipo, capacidade)
3. **Peca** - Peças e componentes das aeronaves
4. **Etapa** - Etapas do processo de produção
5. **Funcionario** - Cadastro de funcionários (engenheiros, técnicos, operadores)
6. **Teste** - Testes realizados nas aeronaves
7. **Producao** - Gerenciamento do processo de produção

### Relacionamentos

- Uma Aeronave possui múltiplas Peças
- Uma Aeronave possui múltiplas Etapas
- Uma Aeronave possui múltiplos Testes
- Uma Produção está relacionada a uma Aeronave
- Uma Produção está relacionada a um Funcionário

## Compatibilidade

Este backend foi desenvolvido para ser **100% compatível** com:

- **AV1**: CLI de gerenciamento de produção (lógica de negócio)
- **AV2**: Frontend React (endpoints e estrutura de dados)

Toda a lógica de negócio foi baseada nas implementações do AV1, e todos os endpoints foram projetados para atender às necessidades do frontend AV2.

## Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── controllers/           # Controladores HTTP
│   │   ├── aeronave.controller.ts
│   │   ├── etapa.controller.ts
│   │   ├── funcionario.controller.ts
│   │   ├── peca.controller.ts
│   │   ├── producao.controller.ts
│   │   ├── teste.controller.ts
│   │   └── usuario.controller.ts
│   ├── services/              # Lógica de negócio
│   │   ├── aeronave.service.ts
│   │   ├── etapa.service.ts
│   │   ├── funcionario.service.ts
│   │   ├── peca.service.ts
│   │   ├── producao.service.ts
│   │   ├── teste.service.ts
│   │   └── usuario.service.ts
│   ├── routes/                # Definição de rotas
│   │   ├── aeronave.routes.ts
│   │   ├── etapa.routes.ts
│   │   ├── funcionario.routes.ts
│   │   ├── peca.routes.ts
│   │   ├── producao.routes.ts
│   │   ├── teste.routes.ts
│   │   └── usuario.routes.ts
│   ├── lib/
│   │   └── prisma.ts          # Cliente Prisma
│   ├── middleware/
│   │   └── requestLogger.ts   # Middleware de logging
│   └── index.ts               # Servidor Express
├── .env.example               # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Desenvolvimento

### Visualizar banco de dados

Use o Prisma Studio para visualizar e editar dados:

```bash
npm run prisma:studio
```

Abre em `http://localhost:5555`

### Resetar banco de dados

```bash
npx prisma migrate reset
```

### Gerar novo migration

```bash
npx prisma migrate dev --name descricao_da_mudanca
```

## Solução de Problemas

### Erro de conexão com MySQL

Verifique se:
1. O MySQL está rodando: `sudo service mysql status` (Linux) ou verifique nos serviços (Windows)
2. As credenciais no `.env` estão corretas
3. O banco de dados `av3_database` foi criado
4. O usuário tem permissões adequadas

### Erro ao executar migrações

Se houver erro nas migrações, tente:

```bash
npx prisma generate
npx prisma db push
```

### Porta 3000 já está em uso

Altere a variável `PORT` no arquivo `.env` para outra porta disponível.

## Contribuição

Este projeto faz parte do sistema AV3 de gerenciamento de produção de aeronaves.

## Licença

MIT
