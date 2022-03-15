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

const modelName = "Friend";

type statusType = "friend" | "pending" | "blocked";

class Friend extends Model<
  InferAttributes<Friend>,
  InferCreationAttributes<Friend>
> {
  declare id: CreationOptional<number>;
  declare status: statusType;
  declare senderId: number;
  declare receiverId: number;
  declare sender: NonAttribute<User>;
  declare receiver: NonAttribute<User>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Friend.init(
  {
    id: {
      type: DataTypes.NUMBER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ["friend", "pending", "blocked"],
      defaultValue: "pending",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName,
  }
);

User.hasMany(Friend, {
  foreignKey: "senderId",
  as: "sender",
});
Friend.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});
User.hasMany(Friend, {
  foreignKey: "receiverId",
  as: "receiver",
});
Friend.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiver",
});

export default Friend;
