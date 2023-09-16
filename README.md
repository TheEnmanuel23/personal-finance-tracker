# Personal Finance Tracker

## What's inside?

This project is a [Monorepo](https://monorepo.tools/) solution, and it uses [Turborepo](https://turbo.build/repo), it includes the following packages/apps:

### Apps and Packages

- `api`: a RestAPI built with [NodeJS](https://nodejs.org/en), [TypeScript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/) app
- `front`: a [ReacJS](https://react.dev/) built with [Vite](https://vitejs.dev/), and [Tailwindcss](https://tailwindcss.com/) app
- `ui`: a [ReacJS](https://react.dev/) component library shared by `front`, and besides, it uses [Storybook](https://storybook.js.org/)
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

Some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd personal-finance-tracker
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd personal-finance-tracker
npm dev
```

You can also run `Storybook` using the following command:

```
npm run storybook
```

### NOTE:

I have added two `env` files, normally we should not upload those files, but I did so for testing purposes.

- /apps/api/.env
- /apps/front/.env

**I'll delete the database I used for this challenge once you have tested the challenge**

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
