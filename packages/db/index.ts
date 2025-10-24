console.log("Hello via Bun!");
// Load environment variables from packages/db/.env before creating the Prisma client.
// Prisma (and the generated client) reads DATABASE_URL from process.env at runtime.
// We explicitly load dotenv here so running `bun run` in apps/backend finds the .env file
// located in the db package.
import { config as dotenvConfig } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenvConfig({ path: path.resolve(__dirname, ".env") });

// Import the generated Prisma client directly from the package's `generated/prisma` folder.
// This avoids relying on a generated `@prisma/client` package in the repo root node_modules,
// which can be missing in monorepo setups.
import { PrismaClient } from "./generated/prisma/client";

if (!process.env.DATABASE_URL) {
	console.warn(
		"Warning: DATABASE_URL is not set. Prisma will fail to connect. Check packages/db/.env or set the environment variable."
	);
}

export const prismaClient = new PrismaClient();