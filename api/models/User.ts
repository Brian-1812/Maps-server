import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
} from "sequelize";
import sequelize from "../config/database";
import bcryptService from "../services/bcrypt.service";
import Roadsign from "./Roadsign";

const modelName = "User";
const hooks = {
  beforeCreate(user: any) {
    user.password = bcryptService().password(user.password);
  },
};

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare displayname: string | null;
  declare fullName: string | null;
  declare email: string;
  declare phoneNumber: string;
  declare password: string;
  declare role: CreationOptional<"admin" | "user">;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare signs?: NonAttribute<Roadsign[]>;
  declare static associations: {
    signs: Association<User, Roadsign>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.NUMBER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    displayname: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName,
    hooks,
  }
);

// eslint-disable-next-line
// User.prototype.toJSON = function () {
//   const values = Object.assign({}, this.get());

//   delete values.password;
//   return values;
// };

export default User;
