const app = require('./app');
ServerConfig = require('./configs/server.config');


app.listen(ServerConfig.PORT, ()=>
{
    console.log(`My Server Started Running on the port numbt :-  ${ServerConfig.PORT}`)
})