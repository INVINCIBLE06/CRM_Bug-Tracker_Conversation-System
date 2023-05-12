const constants = require('../utils/constants');

require('dotenv').config();

module.exports = (sequelize, Sequelize) => 
{
    const User = sequelize.define("users",
    {
        user_id :
        {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        name :
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
            
        },
        email :
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        contact_no :
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        date_of_birth : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        // security_question :
        // {
        //     type : Sequelize.STRING,
        //     defaultValue : constants.Squestion,
        //     allowNull : false
        // },
        // security_answer :
        // {
        //     type : Sequelize.STRING,
        //     /// defaultValue : process.env.SecurityAnswer,
        //     allowNull : false
        // },
        usertype : 
        {
            type : Sequelize.STRING,
            // / values : [process.env.engineer, process.env.admin, process.env.customer],
            required : true,
            allowNull : false
        },
        userstatus :
        {
            type : Sequelize.ENUM,
            // defaultValue : process.env.approved,
            values : [constants.userStatus.approved, constants.userStatus.rejected, constants.userStatus.pending, constants.userStatus.blocked],
            allowNull : false
        },
        password : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        confirm_password : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        created_on :
        {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            immutable : true,
            //// defaultValue : () => 
            //                     {
            //                         return Date.now();
            //                     } 
        },
        updated_on :
        {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW
            // // defaultValue : () => 
            //                     {
            //                         return Date.now();
            //                     }
        },
        // role_id :
        // {
        //     type : Sequelize.INTEGER,
        //     attributes :[],
        //     values :
        //     {
                
        //     }
        // }
    },    
    {
        timestamps : false
    });
    return User;
};