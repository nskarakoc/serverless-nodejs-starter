# serverless-typescript-template

An example TypeScript template for the serverless framework. Integrated with these technologies:

- Serverless Framework
- Express
- TypeORM
- MySQL

## Installation

Use the command below to install necessary packages.

```bash
npm install
```

## Configurations

Configurations are stored in [development](config/development.json) and [production](config/production.json) files. These files can be extended as needed.

## Run locally

You should have a MySQL server to be able to run the API locally. You may install that on your computer directly, or run with a docker, or use a 3rd party provider. Once you are done, update [.env.dev](.env.dev) or [.env.prod](.env.prod) file according to your MySQL server settings. When you are done with database setup, run the commands below and API should start listening on port 3000.

Run against development environment:

```bash
npm run api-dev
```

Run against production environment:

```bash
npm run api-prod
```

## Deployment

Like local setup, again a MySQL server database is required to deploy the API. When it's ready, update [.env.dev](.env.dev) or [.env.prod](.env.prod) file according to your MySQL server settings.

Deploy to development environment:

```bash
npm run deploy-dev
```

Deploy to production environment:

```bash
npm run deploy-prod
```

## Scripts

Scripts are useful for executing certain logics from your local against an environment.

Run a script against development environment:

```bash
npm run script-dev src/scripts/template.ts
```

Run a script against production environment:

```bash
npm run script-prod src/scripts/template.ts
```

## Migrations

TypeORM is used for the database migrations. Make sure you created the database before running migrations:

```mysql
CREATE DATABASE `sample_schema`;
```

Show migrations against development environment:

```bash
npm run typeorm-dev migration:show
```

Generate a new migration against development environment:

```bash
npm run typeorm-dev migration:generate -- -p src/migrations/CreateSampleEntity
```

Run migrations against development environment:

```bash
npm run typeorm-dev migration:run
```

Revert the last migration against development environment:

```bash
npm run typeorm-dev migration:revert
```

Replace `typeorm-dev` with `typeorm-prod` to run TypeORM CLI against production environment.
