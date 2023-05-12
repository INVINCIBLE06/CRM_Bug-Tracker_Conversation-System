const db = require("./models");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const User = db.user

module.exports = async () =>
{
    try
    { 
          
        const user = await User.findOne
        ({
            where :
            {
                Usertype : process.env.admin,
                Email : process.env.email
            }
        })
    // var rolesdata = 
    // [
    //     {
    //         id : 1,
    //         name : "CUSTOMER"
    //     },
    //     {
    //         id : 2,
    //         name : "ENGINEER"
    //     },
    //     {
    //         id : 3,
    //         name : "ADMIN"
    //     }
    // ]
    if(user)
    {
        console.log("**** Admin data is already available ****");
        return;
    }
    else
    {
        var adminData = 
            [{
                Name : process.env.name,
                Email : process.env.email,
                Password : bcrypt.hashSync(process.env.password,8),
                Confirm_Password : bcrypt.hashSync(process.env.confirm_password,8),
                security_answer : process.env.SecurityAnswer,
                Contact_No : process.env.contact_no,
                Date_Of_Birth : process.env.DOB,
                Usertype : process.env.admin,
                username : process.env.us_name,
                // Security_Answer : process.env.SecurityAnswer
            }]
        db.user.bulkCreate(adminData).then(() =>
        {
            console.log("**** Admin table is intialized with the data ****")
        }).catch((err) => 
            {
                console.log("Error while intializing the ADMIN DATA", err.message)
            })
    }
    }
    catch(err)
    {
        console.log(" **** Error while entering the admin data **** ", err.message)
    }
};