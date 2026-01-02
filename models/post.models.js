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
        allowNull: false,
      },
      mediaType: {
        type: DataTypes.ENUM("none", "image", "video"),
        allowNull: false,
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
      timestamp: true,
    }
  );
  return Post;
};
