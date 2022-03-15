import database from "../config/database";

const authenticateDB = () => database.authenticate();
const dropDB = () => database.drop();
const syncDB = () => database.sync();

const errorDBStart = (err: any) =>
  console.info("UNABLE TO CONNECT TO THE DATABASE", err);

const wrongEnvironment = (environment: any) => {
  console.warn(
    `only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`
  );
  return process.exit(1);
};

const successfulDBStart = () =>
  console.info("CONNECTION TO THE DATABASE HAS BEEN ESTABLISHED SUCCESSFULLY");

const startMigrateTrue = async () => {
  try {
    await syncDB();
    successfulDBStart();
  } catch (err) {
    errorDBStart(err);
  }
};

const startMigrateFalse = async () => {
  try {
    await dropDB();
    await syncDB();
    successfulDBStart();
  } catch (err) {
    errorDBStart(err);
  }
};

const startDev = async (migrate: boolean) => {
  try {
    await authenticateDB();

    if (migrate) {
      return startMigrateTrue();
    }

    return startMigrateFalse();
  } catch (err) {
    return errorDBStart(err);
  }
};

const startProd = async () => {
  try {
    await authenticateDB();
    await startMigrateFalse();
  } catch (err) {
    errorDBStart(err);
  }
};

const dbService = async (env: any, migrate: boolean) => {
  switch (env) {
    case "development":
      await startDev(migrate);
      break;
    case "production":
      await startProd();
      break;
    default:
      await wrongEnvironment(env);
  }
};

export default dbService;
