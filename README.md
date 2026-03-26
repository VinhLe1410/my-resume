# My Resume

A personal resume site built as a pnpm monorepo with a **SvelteKit** front-end and a **Sanity Studio** back-end.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/)

## Getting Started

```sh
# Install all dependencies
pnpm install

# Run both front-end and back-end in parallel
pnpm dev
```

This starts the SvelteKit dev server and Sanity Studio simultaneously using `concurrently`.

## Root Commands

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `pnpm dev`           | Run front-end and back-end dev servers in parallel |
| `pnpm dev:frontend`  | Run only the front-end dev server                  |
| `pnpm dev:backend`   | Run only the back-end dev server (Sanity Studio)   |
| `pnpm build`         | Build the front-end for production                 |
| `pnpm build:backend` | Build the back-end (Sanity Studio)                 |
| `pnpm typecheck`     | Run SvelteKit type checking                        |
| `pnpm lint`          | Lint the entire project with ESLint                |
| `pnpm lint:fix`      | Lint and auto-fix issues                           |
| `pnpm format`        | Format all files with Prettier                     |
| `pnpm format:check`  | Check formatting without writing changes           |
| `pnpm check`         | Format + lint fix in one pass                      |
| `pnpm check:ci`      | Format check + lint (CI-friendly, no writes)       |

## Front-End (`front-end/`)

Built with **SvelteKit**, **Tailwind CSS v4**, and **TypeScript**.

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start the Vite dev server          |
| `pnpm build`       | Build for production               |
| `pnpm preview`     | Preview the production build       |
| `pnpm check`       | Run `svelte-check` for type errors |
| `pnpm check:watch` | Run `svelte-check` in watch mode   |

## Back-End (`back-end/`)

Built with **Sanity Studio v5** (React-based CMS).

| Command               | Description                            |
| --------------------- | -------------------------------------- |
| `pnpm dev`            | Start Sanity Studio in dev mode        |
| `pnpm start`          | Start Sanity Studio                    |
| `pnpm build`          | Build Sanity Studio for production     |
| `pnpm deploy`         | Deploy Sanity Studio to Sanity hosting |
| `pnpm deploy-graphql` | Deploy a GraphQL API for the dataset   |

## Project Structure

```
my-resume/
├── front-end/       # SvelteKit app (Tailwind CSS, TypeScript)
├── back-end/        # Sanity Studio (CMS)
├── package.json     # Root scripts & shared dev dependencies
└── pnpm-workspace.yaml
```
