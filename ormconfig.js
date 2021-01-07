// console.log(process.env.SECRET);
module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
