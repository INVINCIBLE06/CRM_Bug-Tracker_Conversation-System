const db = require('../models');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

exports.signup = async(req, res) => 
{
    const userObj = 
    {
        Name : req.body.Name,
        username : req.body.username,
        Email : req.body.Email,
        Contact_No : req.body.Contact_No,
        Usertype : req.body.Usertype,
        Date_Of_Birth : req.body.Date_Of_Birth,
        Userstatus : req.body.Userstatus,
        Password : bcrypt.hashSync(req.body.Password, 8),
        Confirm_Password : bcrypt.hashSync(req.body.Confirm_Password, 8)
    };
    
    try
    {
        const userCreated = await User.create(userObj);
        const response = 
        {
            Name : userCreated.Name,
            username : userCreated.username,
            Email : userCreated.Email,
            Contact_No : userCreated.Contact_No,
            Usertype : userCreated.Usertype,
            Userstatus : userCreated.Userstatus,
            Date_Of_Birth : userCreated.Date_Of_Birth,
            Password : userCreated.Password,
            Confirm_Password : userCreated.Confirm_Password
        }
        console.log(`#### ${response.Usertype} ${response.Name} created ####`);
        res.status(201).send(response);
    }
    catch(err)
    {
        console.log(" **** Error while user signup **** ", err.message);
        res.status(500).send
        ({
            message : "Internal server error while creating user"
        });
    }
};


exports.signin = async(req, res) => 
{
    try
    {
        const user = await User.findOne({ where : { username : req.body.username }});
        if(!user)
        {
            console.log(" **** This email is not available. Please register first **** ", err.message);
            return res.status(400).send
            ({
                message : "This email is not available. Please register first"
            });
        }
        const isValidPassword = bcrypt.compareSync(req.body.Password, user.Password);
        if(!isValidPassword)
        {
            console.log(" **** You have entered wrong password. ****", err.message)
            return res.status(400).send
            ({
                message : "Password is not correct."
            });
        }
        
        var token = jwt.sign({id : user.id}, config.secret,{
            expiresIn : 86400 // 24 hours
        });

        console.log(" **** User Logged in Successfully **** ");
        return res.status(200).send
        ({
            id : user.id,
            username : user.username,
            Email : user.Email,
            accessToken : token
        });
    }
    
    
    catch(err)
    {
        console.log(" **** Error while user sigin **** ")
        res.status(500).send
        ({
            message : "Internal Server Error While Sign-In user"
        });
    }
};