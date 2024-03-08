# DICE - Decentralized Immutable Credential Ecosystem

DICE is a platform for institutions to issue certificates and students to manage their certificates. It uses web3 for issueing, managing and verifying credentials.

## How to run

This is a monorepo of the whole application. Run these commands from the root directory

1. Install all dependencies

```sh
pnpm i
```

2. Setup the database and do migrations

- Create a file named `dev.db` inside the folder `/packages/dice-webapp/prisma` (on same folder as `schema.prisma`)
- Then run this command

```sh
pnpm run webapp:prisma:migrate
```

- Delete the migrations folder created inside `/packages/dice-webapp/prisma` (In this project we don't version control the migrations)

3. To run webapp

- Set the environment variables like .env.example to .env file
- Then run this command

```sh
pnpm run webapp:dev
```

4. To deploy contract

```sh
pnpm run contract:deploy
```

For more commands go through the package.json in root and for relevant packages too.
