module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            gender: {
                type: DataTypes.ENUM("male", "female", "other"),
                allowNull: false
            },
            dateOfBirth: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            deletedBy: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            table: "users",
            timestamp: true
        }
    )
    return User
}