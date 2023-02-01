const db = require("./models");
const constants = require("./utils/constants");
require('dotenv').config();
const Role = db.role;

module.exports = async () => 
{
    try 
    {
       const role = await Role.findOne
       ({
            where :
            {
                name : process.env.rolename
            }
       });
       if(role)
       {
            console.log("**** Admin role is already available ****");
            return;
       }
       else
       {
            var adminRole =  
            [{
                name : process.env.rolename,
                create : constants.granted.yes,
                update : constants.granted.yes,
                read : constants.granted.yes,
                delete : constants.granted.yes 
            }];

            db.role.bulkCreate(adminRole).then(() =>
            {
                    console.log("**** Admin role is intialized with the data ****")
            }).catch((err) => 
                {
                    console.log("**** Error while intializing the ADMIN role **** ", err.message)
                });
       }       
    } 
    catch (error) 
    {
        console.log(" **** Error while entering the admin role **** ", err.message);        
    }
};