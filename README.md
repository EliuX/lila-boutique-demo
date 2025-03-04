# Lila Boutique Demo

An embedded app starter template to get up and ready with Shopify app development with Next.js and Prisma.

I've included [notes](/docs/NOTES.md) on this repo which goes over the repo on why certain choices were made.

## Technologies

- Package manager: yarn (preferred), npm (acceptable, just replace `yarn` by `npm run` in the instructions).
- Tunnel (pour connecter l'app locale avec Shopify): [Ngrok](https://ngrok.com/downloads/).
- Database: PostgreSQL.

## How to install

- Install required tools globally, like the Shopify CLI

```bash
yarn g:install
```

- Install dependencies

```bash
yarn install
```

- Install PostgreSQL in your system, e.g. in MacOS ` brew install postgresql@14`. Check out [here](https://www.postgresql.org/download/macosx/) for more details.
  Make sure to create the database with `yarn pg:create` and start the services, e.g. `brew services start postgresql`.
- Build your Prisma (ORM) client, based on your Prisma scammer: `yarn prepare` and push the prisma schema with `yarn prisma:push`

- After installing ngrok, you can signup/login and config your CLI with your current auth token

```bash
 ngrok config add-authtoken $NGROK_AUTHTOKEN
```

and execute ngrok with `yarn ngrok` which basically executes `ngrok http 3000` and add your ngrok-free.app URL into the env variable `SHOPIFY_APP_URL`

- Update the config with `yarn update:config`

## How to start the demo

- Build the project with `yarn build`

- Start the project with `yarn start` or `yarn dev` while coding

- Install the app by opening in your browser the following url `https://<storename>.myshopify.com/admin/oauth/install?client_id=<SHOPIFY_API_KEY>`:

```bash
source .env;open https://$APP_HANDLE.myshopify.com/admin/oauth/install?client_id=$SHOPIFY_API_KEY
```

After installing this app you are ready to go

## How to show orders in the system

1 - Firstly, create an order in the backend of the app: In the menu "Orders", select "New Order", there you select a product and some existing "Customer"; also you can create custom ones.

> Note: the easiest way to add orders is to use the submenu "Drafts", where some orders are premade. You just need to select them and mark it as paid.

2 - Go to the app flow "Lila Boutique demo" and select the "Les ventes" > "Ordres d'achats".

3 - In the list of orders you will see the orders that are already imported. There is a webhook that is triggered after an order was created (like in the step 1). You can also "Update" manually these entries, which will import them from Shopify into your database.

## Notes

- Refer to [SETUP](/docs/SETUP.md)
- The project comes with snippets to speed up development. Refer to [Snippets](/docs/SNIPPETS.md).
- App Bridge CDN migration guide is available [here](/docs/migration/app-bridge-cdn.md)
- Shopify Managed Installation migration guide is available [here](/docs/migration/oauth-to-managed-installation.md)
- Client Provider abstraction update guide is available [here](/docs/migration/clientProvider.md)
- GraphQL to Managed Webhooks migration guide is available [here](/docs/migration/managed-webhooks.md)
