
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://db_owner:5L8vHhMewnJT@ep-twilight-tree-a1ci8oy0.ap-southeast-1.aws.neon.tech/Kids_storyGenerator?sslmode=require',
  },
  verbose: true,
  strict:true,})