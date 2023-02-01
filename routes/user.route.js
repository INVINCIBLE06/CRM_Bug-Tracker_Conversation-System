const userController = require('../controllers/user.controller');
// const {authJwt, verifyTokens, verifyBody} = require('../middlewares')
const {validator} = require('../middlewares')

module.exports = (app) => 
{
    app.post("/bugtracker/api/v2/users/signup", validator.ValueEnteredCheck, validator.ValidateSignUpRequestBody, validator.DuplicateValueCheck, userController.signup);
    app.post("/bugtracker/api/v2/users/signin", userController.signin);
};