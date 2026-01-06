module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mediaURL: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      mediaType: {
        type: DataTypes.ENUM("none", "image", "video"),
        allowNull: true,
        defaultValue: "none",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "posts",
      timestamps: true,
    }
  );
  return Post;
};
