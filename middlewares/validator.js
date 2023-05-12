const db = require("../models");
User = db.user;

IsValidDateOfBirth = (DOB) => 
{
    return DOB.match("/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/");
};

IsValidPassword = (Password) => 
{
    return Password.match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/");
}

IsValidEmail = (Email) => 
{
    return String(Email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); 
}

IsValidContact_No = (Contact_No) => 
{
    return Contact_No.match("/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/");
}

const ValueEnteredCheck = (req, res) => 
{
    try
    {
        if(!req.body.username)
        {
            return res.status(400).send
            ({
                message : "username is not provide. It is required for signup"
            });
        }
        else if(!req.body.Email)
        {
            return res.status(400).send
            ({
                message : "Email id is not provided. It is required for signup"
            });
        }
        else if(!req.body.Date_Of_Birth)
        {
            return res.status(400).send
            ({
                message : "Date of birth is not provided. It is required for signup"
            });
        }
        else if(!req.body.Password)
        {
            return res.status(400).send
            ({
                message : "Password is not provided. It is required for signup"
            });
        }
        else if(!req.body.Confirm_Password)
        {
            return res.status(400).send
            ({
                message : "Confirm Password is not provided. It is required for signup"
            });
        }
        else if(!req.body.Usertype)
        {
            return res.status(400).send
            ({
                message : "Usertype is not provided. Please provide from one of these two ADMIN, ENGINEER . It is required for signup"
            });
        }
        else if(!req.body.Name)
        {
            return res.status(400).send
            ({
                message : "Name is not provided. It is required for signup"
            });
        }
        else if(!req.body.Security_Answer)
        {
            return res.status(400).send
            ({
                message : " Security Answer is not provided. It will used for making new password. When the user have forgotten the password. It is required for signup"
            });
        }
        else
        {
            next();
        }
    }
    catch(err)
    {
        console.log(" **** Error while checking the value entered function ****");
        res.status(500).send({ message : "Internal Server error while checking the value entered"});
    }
};

const ValidateSignUpRequestBody = async (req, res, next) =>
{
    try
    {        
        if(IsValidEmail(req.body.Email))
        {
            return res.status(400).send
            ({
                message : "Email is not in correct format. Please write a email in correct form"
            }); 
        }
        else if(!IsValidPassword(req.body.Password))
        {
            return res.status(400).send
            ({
                message : "Failed ! Not a valid password. Password must be 8 to 12 character containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            });
        }
        else if(req.body.Password != req.body.Confirm_Password)
        {
            return res.status(400).send
            ({
                message : "Password and Confirm password are not matching. Please do type both the password same"
            });
        }
        else if(IsValidPassword(req.body.Confirm_Password))
        {
            return res.status(400).send
            ({
                message : "Failed ! Not a valid confirm password. Confirm Password must be 8 to 12 character containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            });
        }
        else if(!IsValidContact_No(req.body.Contact_No))
        {
            return res.status(400).send
            ({
                message : "The contact number is not in the correct format"
            });
        }
        else if(IsValidDateOfBirth(req.body.Date_Of_Birth))
        {
            return res.status(400).send
            ({
                message : "The date of birth is not valid. Please enter the enter in this format YYYY/MM/DD" 
            });
        }
    }
    catch(err)
    {
        console.log(" **** Error while validation user signup attributes like date of birth, password, contact number, confirm password, and email ****", err.message);
        res.status(500).send
        ({
            message : "Internal server error while validation user signup attributes like date of birth, password, contact number, confirm password, and email"
        });
    }
};


const DuplicateValueCheck = async(req, res) =>
{
    try
    {
        const user = await User.findOne({ where : { username : req.body.username }});
        if(!user)
        {
            console.log("### username is not available. Please check some other ###");
            res.status(400).send
            ({
                message : " Internal server error username is not available. Please check some other"
            });
        }
        const user2 = await User.findOne({ where : { Email : req.body.Email }});
        if(!user2)
        {
            console.log(" ### Email id is already registered someone else. Please enter some other email for signup ###");
            res.status(400).send
            ({
                message : " Internal server error email id is already registered someone else. Please enter some other email for signup"
            });
        }
        const user3 = User.findOne({ where : { Contact_No : req.body.Contact_No }});
        if(!user3)
        {
            console.log(" ### Someone already having this contact number. Please check once again ###");
            res.status(400).send
            ({
                message : " Internal server error someone already having this contact number. Please check once again"
            });  
        }         
    }
    catch(err)
    {
        console.log(" **** Error while checking the duplicate values ****", err.message);
        res.status(500).send({
            message : "Internal servor error whil checking the duplicte values"
        })
    }
};


const validator = 
{
    DuplicateValueCheck,
    ValidateSignUpRequestBody,
    ValueEnteredCheck
};

module.exports = validator