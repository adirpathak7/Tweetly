module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    const Role = sequelize.define(
        "Role",
        {
            roleId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "roles",
            timestamps: true
        }
    )
    return Role
}
=======
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
>>>>>>> origin/office
