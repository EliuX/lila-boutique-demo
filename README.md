# Lila Boutique Demo

Un modèle de démarrage d'application embarquée pour démarrer rapidement avec le développement d'applications Shopify avec Next.js et Prisma.

J'ai inclus des [notes](/docs/NOTES.md) dans ce dépôt qui expliquent pourquoi certaines décisions ont été prises.

## Technologies

- NodeJS v20+
- Gestionnaire de paquets : yarn (préféré), npm (acceptable, il suffit de remplacer `yarn` par `npm run` dans les instructions).
- Tunnel (pour connecter l'application locale avec Shopify) : [Ngrok](https://ngrok.com/downloads/).
- Base de données : PostgreSQL.

## Comment installer

- Installer les outils requis globalement, comme le Shopify CLI :

```bash
yarn g:install
```

- Installer les dépendances :

```bash
yarn install
```

- Installer PostgreSQL sur votre système, par exemple sous MacOS `brew install postgresql@14`. Consultez [ici](https://www.postgresql.org/download/macosx/) pour plus de détails.
  Assurez-vous de créer la base de données avec `yarn pg:create` et de démarrer les services, par exemple : `brew services start postgresql`.

- Générer le client Prisma (ORM) en fonction de votre schéma Prisma :

```bash
yarn prepare
```

Puis poussez le schéma Prisma avec :

```bash
yarn prisma:push
```

- Après avoir installé ngrok, vous pouvez vous inscrire/se connecter et configurer votre CLI avec votre jeton d'authentification actuel :

```bash
ngrok config add-authtoken $NGROK_AUTHTOKEN
```

Puis exécutez ngrok avec `yarn ngrok`, ce qui exécute essentiellement `ngrok http 3000` et ajoutez votre URL ngrok-free.app à la variable d'environnement `SHOPIFY_APP_URL`.

- Mettre à jour la configuration avec :

```bash
yarn update:config
```

## Comment démarrer la démo

- Compiler le projet avec :

```bash
yarn build
```

- Démarrer le projet avec :

```bash
yarn start
```

ou en mode développement :

```bash
yarn dev
```

- Installer l'application en ouvrant dans votre navigateur l'URL suivante :

```bash
source .env; open https://$APP_HANDLE.myshopify.com/admin/oauth/install?client_id=$SHOPIFY_API_KEY
```

Après avoir installé cette application, vous êtes prêt à l'utiliser.

## Comment afficher les achats dans le système

1 - Créez une achat dans le backend de l'application : Dans le menu "Orders", sélectionnez "New Order". Là, choisissez un produit et un "Customer" existant ou créez-en un personnalisé.

> Remarque : Le moyen le plus simple d'ajouter des achats est d'utiliser le sous-menu "Drafts", où les données sont pré-remplies. Il suffit de les sélectionner et de les marquer comme payées.

2 - Allez dans le flux d'application "Lila Boutique Demo" et sélectionnez "Les ventes" > "Ordres d'achats".

3 - Dans la liste d'achats (`/orders`), vous verrez celles déjà importées. Un webhook est déclenché après la création d'une commande (comme à l'étape 1). Vous pouvez également "Mettre à jour" ces entrées manuellement, ce qui les importera de Shopify vers votre base de données.

## Notes

- Référez-vous à [SETUP](/docs/SETUP.md).
- Le projet inclut des snippets pour accélérer le développement. Voir [Snippets](/docs/SNIPPETS.md).
- Guide de migration App Bridge CDN disponible [ici](/docs/migration/app-bridge-cdn.md).
- Guide de migration de l'installation gérée par Shopify disponible [ici](/docs/migration/oauth-to-managed-installation.md).
- Guide de mise à jour de l'abstraction Client Provider disponible [ici](/docs/migration/clientProvider.md).
- Guide de migration de GraphQL vers les webhooks gérés disponible [ici](/docs/migration/managed-webhooks.md).
