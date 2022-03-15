import { Dialect, Sequelize } from "sequelize";

export const connection = {
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql" as Dialect,
};

let database = new Sequelize(
  connection.database,
  connection.username,
  connection.password,
  {
    host: connection.host,
    dialect: connection.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    // storage: path.join(process.cwd(), 'db', 'database.sqlite'),
  }
);

export default database;
