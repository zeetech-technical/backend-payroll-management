# Backend Payroll Management

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx)
![Mariadb](https://img.shields.io/badge/mariadb-003545.svg?style=for-the-badge&logo=mariadb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Zod](https://img.shields.io/badge/zod-%23408AFF.svg?style=for-the-badge&logo=zod&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

Backend de gestión de nominas y usuarios construido con Node.js y TypeScript

---

## Características

- **JWT** con access tokens y refresh tokens
- **Logging estructurado** con Winston
- **Validación de esquemas** con Zod
- **Documentación interactiva** con Swagger (disponible y funcional)

---

## Stack técnico

| Capa               | Tecnología                  |
| ------------------ | --------------------------- |
| Runtime            | Node.js 20 + TypeScript     |
| Framework          | Express                     |
| Base de datos      | MariaDB (LTS) vía Sequelize |
| Proxy (producción) | Nginx                       |
| Contenedores       | Docker + Docker Compose     |

---

## Variables de entorno

Copia `.env.example` a `.env` y configura los valores según tu entorno:

```bash
cp .env.example .env
```

---

## Entornos Docker

El proyecto usa cuatro archivos `docker-compose` separados según el propósito.

### Resumen de entornos

|                   | `docker-compose.dev.yml`                         | `docker-compose.prod.yml`                         |
| ----------------- | ------------------------------------------------ | ------------------------------------------------- |
| **Imágenes**      | mariadb:lts-noble                                | mariadb:lts-noble, nginx:alpine                   |
| **Dockerfile**    | `Dockerfile.dev` — etapas: `base`, `development` | `Dockerfile.prod` — etapas: `build`, `production` |
| **Imagen base**   | node:20.20.2-alpine3.23                          | node:20.20.2-alpine3.23                           |
| **Volúmenes**     | `:/app/`, `/app/node_modules`                    | `./nginx.conf:/etc/nginx/conf.d/default.conf`     |
| **Tamaño aprox.** | 691 MB (357 MB sin MariaDB)                      | 689 MB (355 MB sin MariaDB)                       |

### Tipos de compose

| Tipo     | Archivo                       |
| -------- | ----------------------------- |
| Base     | `-f docker-compose.dev.yml`   |
| Base     | `-f docker-compose.prod.yml`  |
| Opcional | `-f docker-compose.tools.yml` |

---

## Uso

### Solo la base (recomendado)

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Base + herramientas opcionales

Puedes combinar varios archivos, pero ten en cuenta que cada uno suma peso y consumo de RAM:

```bash
docker compose -f docker-compose.dev.yml -f docker-compose.tools.yml up --build
```

### Bajar los contenedores

Usa el mismo comando con el que iniciaste, pero reemplaza `up --build` por `down -v`:

```bash
docker compose -f docker-compose.dev.yml down -v
```

---

## Documentación de la API

La documentación Swagger está disponible mientras el servidor está corriendo y la variable de entorno NODE_ENV sea development:

```
http://localhost:<PORT>/api-docs
```

---

## Notas

- MariaDB puede ejecutarse en un servicio externo o administrado; los compose la incluyen de forma opcional.
- Para limpiar imágenes y volúmenes no utilizados puedes ejecutar `docker system prune -a --volumes`.
