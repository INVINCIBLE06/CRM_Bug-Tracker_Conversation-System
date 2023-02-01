const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require("../configs/db.config")[env];

require('dotenv').config();
// const dbSettings = dbConfig[env];


const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        // operatorsAliases: false,
        pool: 
        {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);

// const db = {};
const db = {Sequelize,sequelize};
// db.Sequelize = Sequelize;
/// db.sequelize = sequelize;
db.user = require('./user.model.js')(sequelize, Sequelize);
db.ticket = require('./ticket.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);


db.user.belongsToMany(db.role,{
    through : "user_roles",
    foreignKey : "roleId",
    otherKey : "userId"
});

db.role.belongsToMany(db.user,{
        through : "user_roles",
        foreignKey : "userId",
        otherKey : "roleId"
});

module.exports = db;