module.exports = (sequelize, DataTypes) => {
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