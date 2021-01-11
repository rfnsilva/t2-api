const { MONGO_HOSTNAME } = process.env;

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const url = `mongodb://${MONGO_HOSTNAME}:27017`;

if (process.env.NODE_ENV === "development") {
  console.log("development");
  module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
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
} else {
  console.log("docker-compose");
  module.exports = {
    type: "mongodb",
    url: url,
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
}
