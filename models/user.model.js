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
        Name :
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
            
        },
        Email :
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        Contact_No :
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        Date_Of_Birth : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        Security_Question :
        {
            type : Sequelize.STRING,
            defaultValue : process.env.SecurityQuestion,
            allowNull : false
        },
        Security_Answer :
        {
            type : Sequelize.STRING,
            defaultValue : process.env.SecurityAnswer,
            allowNull : false
        },
        Usertype : 
        {
            type : Sequelize.ENUM,
            values : [process.env.engineer, process.env.admin, process.env.customer],
            required : true,
            allowNull : false
        },
        Userstatus :
        {
            type : Sequelize.ENUM,
            // defaultValue : process.env.approved,
            values : [process.env.approved, process.env.rejected, process.env.pending],
            allowNull : false
        },
        Password : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        Confirm_Password : 
        {
            type : Sequelize.STRING,
            required : true,
            allowNull : false
        },
        Created_on :
        {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            immutable : true,
            //// defaultValue : () => 
            //                     {
            //                         return Date.now();
            //                     } 
        },
        Updated_on :
        {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW
            // // defaultValue : () => 
            //                     {
            //                         return Date.now();
            //                     }
        },
    },
    {
        timestamps : false
    });
    return User;
};