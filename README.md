# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & install Docker](https://www.docker.com/) and run it

## Installation

- Clone/download repo {https://github.com/Artem-Balanovskyi/nodejs2022Q4-service.git}
- Switch to `Logging/Authentication` branch
- `npm install`
- Copy '.env.example` to `.env' and edit settings if you want

## Running application

Build images and run them in containers
```
npm run docker:compose
```
To delete all Docker containers and images
```
npm run docker:clean
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Next time you can use `docker-compose up` to run already build images.

## Testing

After application running open new terminal and enter:

```
npm run test:auth
```

## Scan for security vulnerabilities

```
npm run docker:scan
```

## Run migrations while docker containers are running:

```
npm run migration:run
```

## Revert 1 migration while docker containers are running:

```
npm run migration:revert
```
## Check lint and format

Without fixing
```
npm run lint
```

With auto-fix
```
npm run lint:fix
```

Format
```
npm run format
```