const db = require('../models');
const Role = db.role

exports.RoleCreation = async(req, res) =>
{
    const roleObj = 
    {
        name : req.body.name,
        create : req.body.create,
        update : req.body.update,
        read : req.body.read,
        delete : req.body.delete,
    };

    try 
    {
        roleCreation = await Role.create(roleObj);
        const response = 
        {
           name : roleCreation.name,
           create : roleCreation.create,
           update : roleCreation.update,
           delete : roleCreation.delete,
           read : roleCreation.read
        }
        console.log(`#### ${response.name} role created ####`);
        res.status(201).send(response);        
    }
    catch (error) 
    {
        console.log(" ### Error while creating the Role ### ", error);
        res.status(500).send
        ({
            message : "Internal server error while creating the role "
        });        
    }

};