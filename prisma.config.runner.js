// Used in the production Docker runner stage.
// defineConfig is a TypeScript type helper only — plain object works fine.
module.exports = {
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
