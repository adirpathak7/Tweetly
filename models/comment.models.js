module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "Comment",
        {
            commentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            commentText: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
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
            table: ""
        }
    )
}