# DICE - Decentralized Immutable Credential Ecosystem

DICE is a platform for institutions to issue certificates and students to manage their certificates. It uses web3 for issueing, managing and verifying credentials.

## How to run
This is a monorepo of the whole application. Run these commands from the root directory

1. Install all dependencies
```sh
pnpm i 
```

2. To run webapp 
- Set the environment variables like .env.example to .env file
- Then run this command
```sh
pnpm run webapp:dev
```

3. To deploy contract
```sh
pnpm run contract:deploy
```

For more commands go through the package.json in root and for relevant packages too.