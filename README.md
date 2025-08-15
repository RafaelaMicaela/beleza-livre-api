# E-commerce API - Cosméticos Veganos

API RESTful para um e-commerce de cosméticos veganos, construída com Node.js, Express e PostgreSQL (via Prisma).

## Pré-requisitos
- Node.js (v20.x LTS)
- PostgreSQL instalado localmente
- Docker (opcional para DB)

## Instalação
1. Clone o repositório: `git clone <seu-repositorio>`
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` com suas credenciais de banco de dados.
4. Crie o banco e aplique as migrations: `npx prisma migrate dev`
5. Inicie o servidor: `npm run dev`

## Scripts
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com nodemon.
- `npm run start`: Inicia o servidor em produção.
- `npm run prisma:migrate`: Aplica migrações do Prisma.
- `npm run test`: Executa os testes (a implementar).

## Estrutura
- `src/`: Código principal da API.
- `prisma/`: Configuração e schema do banco de dados.
- `tests/`: Testes unitários e de integração.

## Contribuição
1. Crie um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`.
4. Envie para o repositório: `git push origin feature/nova-feature`.
5. Abra um Pull Request.

## Licença
[MIT] (a definir)