import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";
import sequelize from "../config/database";
import User from "./User";

const modelName = "Roadsign";

type signTypes = "police" | "radar" | "cctv" | "construction" | "other";

class Roadsign extends Model<
  InferAttributes<Roadsign>,
  InferCreationAttributes<Roadsign>
> {
  declare id: CreationOptional<number>;
  declare body: string | null;
  declare title: string;
  declare type: signTypes;
  declare lat: string;
  declare senderId: number;
  declare sender: NonAttribute<User>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Roadsign.init(
  {
    id: {
      type: DataTypes.NUMBER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.NUMBER.UNSIGNED,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["police", "radar", "cctv", "construction", "other"],
      defaultValue: "radar",
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName,
  }
);

User.hasMany(Roadsign, {
  sourceKey: "id",
  foreignKey: "senderId",
  as: "signs", // this determines the name in `associations`!
});
Roadsign.belongsTo(User);

export default Roadsign;
