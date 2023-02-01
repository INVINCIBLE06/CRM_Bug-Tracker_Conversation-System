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
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        create :
        {
            type : Sequelize.ENUM(constants.granted.yes, constants.granted.no),
            allowNull : false
        },
        update :
        {
            type : Sequelize.ENUM(constants.granted.yes, constants.granted.no),
            allowNull : false
        },
        read :
        {
            type : Sequelize.ENUM(constants.granted.yes, constants.granted.no),
            allowNull : false
        },
        delete :
        {
            type : Sequelize.ENUM(constants.granted.yes, constants.granted.no),
            allowNull : false
        },
        created_on :
        {
            type : Sequelize.DATE,
            immutable : true,
            defaultValue : () => {return Date.now()} 
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