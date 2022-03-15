import Sequelize from "sequelize";
import sequelize from "../../config/database";

import bcryptService from "../services/bcrypt.service";

const tableName = "User";
const hooks = {
  beforeCreate(user: any) {
    user.password = bcryptService().password(user.password);
  },
};

const User = sequelize.define(
  tableName,
  {
    displayname: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
  },
  { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

export default User;
