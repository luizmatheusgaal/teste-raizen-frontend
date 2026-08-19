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
VITE_API_BASE_URL=http://localhost:8000/api/v1
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

## Build e lint

```bash
npm run build
npm run lint
```
