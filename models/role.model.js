module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "roles",
      timestamps: true,
    }
  );
  return Role;
};
