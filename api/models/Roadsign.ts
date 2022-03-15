import Sequelize from "sequelize";
import sequelize from "../config/database";
import User from "./User";

const tableName = "Roadsign";

const Roadsign = sequelize.define(
  tableName,
  {
    body: {
      type: Sequelize.TEXT,
    },
    title: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM,
      values: ["police", "radar", "cctv", "construction", "other"],
      defaultValue: "radar",
    },
    lat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { tableName }
);

User.hasMany(Roadsign);
Roadsign.belongsTo(User);

export default Roadsign;
