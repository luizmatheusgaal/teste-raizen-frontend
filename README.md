# Verzel Events - Frontend

Frontend React + Vite para a plataforma de eventos, ingressos e portaria.

## Tecnologias

- React 19
- Vite 8
- Oxlint
- Docker + Nginx

## Configuração

Copie o exemplo de variáveis de ambiente:

```bash
cp .env.example .env
```

A variável `VITE_API_BASE_URL` deve apontar para o backend Django:

```
VITE_API_BASE_URL=https://teste-raizen-backend.vercel.app/api/v1
```

## Como executar

### Localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### Com Docker

```bash
docker compose up -d
```

Acesse `http://localhost:5173`.

Para recriar a imagem:

```bash
docker compose up -d --build
```

## Deploy na Vercel

1. Importe o repositório no dashboard da Vercel.
2. **Framework Preset**: `Vite`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`
6. Adicione a variável de ambiente `VITE_API_BASE_URL` apontando para o backend de produção, por exemplo:
   ```
   VITE_API_BASE_URL=https://seu-backend.railway.app/api/v1
   ```
7. O arquivo `vercel.json` já configura o roteamento SPA e cache de assets.

> **Importante**: o backend precisa permitir o domínio da Vercel via `CORS_ALLOWED_ORIGINS`. Exemplo:
> ```
> CORS_ALLOWED_ORIGINS=https://seu-frontend.vercel.app,https://www.seudominio.com
> ```

## Build e lint

```bash
npm run build
npm run lint
```
