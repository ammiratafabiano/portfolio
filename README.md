# Portfolio App

[DEMO](https://ammiratafabiano.dev)

> :warning: **Work in progress**: You will probably discover bugs inside my life :)

**My Virtual Portfolio** is a dynamic web application developed using Ionic 7, serving as a digital version of my CV and portfolio. This app allows users to access the latest version of my resume and explore additional information about me.

## Features

- **Virtual CV:** Explore my virtual CV with interactive and engaging content.
- **Latest Resume:** Download the most recent version of my CV in PDF format.
- **QR Code Integration:** In my printed resume or PDF, you will find a QR code. Scan the QR code with your mobile device to access this web app, where you can download the updated CV and discover more about my skills and experiences.

## Tech Stack

- **Ionic 7** / **Angular 16** (standalone components)
- **TypeScript 5**
- **@ngx-translate** for i18n
- **Service Worker** (PWA)

## Development

```bash
npm install
npm start       # Dev server on http://localhost:8100
npm run build   # Production build → www/
npm run lint    # ESLint
```

## Docker

Multi-stage Dockerfile: build Angular → Nginx Alpine.

```bash
# Build image
docker build -t portfolio .

# Run locally
docker run -d -p 8082:80 portfolio
```

### Production deploy

```bash
cd deploy
docker compose up -d
```

The [deploy/apache-vhost.conf](deploy/apache-vhost.conf) provides the Apache reverse proxy configuration for `ammiratafabiano.dev`.
