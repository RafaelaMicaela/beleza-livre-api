# E-commerce API - Cosméticos Veganos 🌱

API RESTful para um e-commerce de cosméticos veganos, construída com Node.js, Express e PostgreSQL (via Prisma). 
Deployada na Vercel com arquitetura serverless para alta escalabilidade.

## 🚀 Status de Produção
- **Ambiente:** Vercel (Serverless)
- **Database:** PostgreSQL (Railway/Neon)
- **Documentação:** Swagger UI disponível
- **Monitoramento:** Vercel Analytics

## 🛠️ Tecnologias
- **Backend:** Node.js 20.x + Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Deploy:** Vercel
- **Segurança:** Helmet, CORS
- **Logs:** Morgan
- **Testes:** Jest + Supertest

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
- `npm run build`: Gera o Prisma Client para produção.
- `npm run vercel-build`: Script de build para deploy no Vercel.
- `npm run prisma:generate`: Gera o Prisma Client.
- `npm run prisma:migrate`: Aplica migrações do Prisma (desenvolvimento).
- `npm run prisma:deploy`: Aplica migrações em produção.
- `npm run test`: Executa os testes (a implementar).

## 🚀 Deploy para Produção

Para instruções completas de deployment, consulte [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy
1. Configure database de produção (Railway/Neon/Supabase)
2. Configure variáveis de ambiente no Vercel
3. Deploy automático via GitHub

```bash
# Preparar para deploy
git add .
git commit -m "Deploy to production"
git push origin main
```

## 📊 API Endpoints

### Health Check
```http
GET / 
# Response: {"message": "API de E-commerce de Cosméticos Veganos"}
```

### Próximos Endpoints (Planejados)
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto  
- `GET /api/users` - Listar usuários
- `POST /api/auth/login` - Autenticação
- `GET /api/orders` - Listar pedidos

*Documentação completa disponível via Swagger UI após deploy.*

## 🔒 Segurança
- Helmet para cabeçalhos de segurança
- CORS configurado
- Variáveis de ambiente protegidas
- Validação de dados (a implementar)
- Autenticação JWT (a implementar)

## 📁 Estrutura
- `src/`: Código principal da API.
- `prisma/`: Configuração e schema do banco de dados.
- `tests/`: Testes unitários e de integração.

## 🤝 Contribuição
1. Crie um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`.
4. Envie para o repositório: `git push origin feature/nova-feature`.
5. Abra um Pull Request.

## 📄 Licença
[MIT] - API aberta para o ecossistema de cosméticos veganos

---

**Desenvolvido com 💚 para um futuro mais sustentável**