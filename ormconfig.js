const { MONGO_HOSTNAME } = process.env;

module.exports = {
  type: process.env.DB_TYPE,
  host:
    process.env.NODE_ENV === "development"
      ? process.env.DB_HOST
      : process.env.MONGO_HOSTNAME,
  database: process.env.DB_NAME,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  migrationsRun: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};