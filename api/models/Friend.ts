import Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import sequelize from "../../config/database";
import User from "./User";

const tableName = "Friend";

const Friend = sequelize.define(
  tableName,
  {
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
      type: Sequelize.ENUM,
      values: ["friend", "pending", "blocked"],
      defaultValue: "pending",
    },
  },
  { tableName }
);

// User.belongsToMany(User, {
//   through: Friend,
//   as: "sender",
//   foreignKey: "senderId",
// });
// User.belongsToMany(User, {
//   through: Friend,
//   as: "receiver",
//   foreignKey: "receiverId",
// });

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
