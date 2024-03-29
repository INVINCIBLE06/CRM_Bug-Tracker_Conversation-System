const constants = require("../utils/constants");

module.exports = (sequelize, Sequelize) => 
{
    const Role = sequelize.define("roles",
    {
        id : 
        {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : 
        {
            type : Sequelize.STRING,
            allowNull : false
        },
        status :
        {
            type : Sequelize.ENUM(constants.status.active, constants.status.inactive)
        },
        created_on :
        {
            type : Sequelize.DATE,
            immutable : true,
            defaultValue : () => { return Date.now() } 
        },
        updated_on :
        {
            type : Sequelize.DATE,
            defaultValue : () => { return Date.now() }
        }
    },
    {
        timestamps: false,
    });
    return Role;
};