const Sequelize = require("sequelize");
const config = require("../config/config.js");
const role = require("./role.model.js");

const sequelize = new Sequelize({
  database: config.development.database,
  username: config.development.username,
  password: config.development.password,
  host: config.development.host,
  dialect: config.development.dialect,
  // logging: false
});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.Role = role(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Post = require("./post.models.js")(sequelize, Sequelize);
db.Comment = require("./comment.models.js")(sequelize, Sequelize);

//  role -> user  (1-M)
db.Role.hasMany(db.User, { foreignKey: "roleId" });
db.User.belongsTo(db.Role, { foreignKey: "roleId" });

// user deletedBy user
db.User.belongsTo(db.User, {
  as: "deletedByUser",
  foreignKey: "deletedBy",
});

//  user -> post  (1-M)
db.User.hasMany(db.Post, { foreignKey: "userId" });
db.Post.belongsTo(db.User, { foreignKey: "userId" });

//  post deletedBy user
db.Post.belongsTo(db.User, {
  as: "deletedByUser",
  foreignKey: "deletedBy",
});

//  user -> comment  (1-M)
db.User.hasMany(db.Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.User, { foreignKey: "userId" });

//  post -> comment  (1-M)
db.Post.hasMany(db.Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  as: "All Comments of post",
});
db.Comment.belongsTo(db.Post, { foreignKey: "postId" });

//  comment deletedBy user
db.Comment.belongsTo(db.User, {
  as: "deletedByUser",
  foreignKey: "deletedBy",
});

db.User.belongsToMany(db.Post, { through: "postLikes", foreignKey: "userId" });
db.Post.belongsToMany(db.User, { through: "postLikes", foreignKey: "postId" });
module.exports = db;
