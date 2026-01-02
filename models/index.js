const Sequelize = require("sequelize")
const config = require("../config/config.js").development

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Role = require("./role.model.js")(sequelize, Sequelize)
db.User = require("./user.model.js")(sequelize, Sequelize)
db.Post = require("./post.models.js")(sequelize, Sequelize)

db.Role.hasMany(db.User, { foreignKey: "roleId" })
db.Role.belongsTo(db.Role, { foreignKey: "roleId" })
db.User.belongsTo(db.User, { as: "deletedByUser", foreignKey: "deletedBy" })
db.Post.belongsTo(db.Post, {foreignKey: "postId"})
db.Post.belongsTo(db.Post, { as: "deletedByUser", foreignKey: "deletedBy" })

module.exports = db