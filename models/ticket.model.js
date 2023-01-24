module.exports = (sequelize, Sequelize) => 
{
    const Ticket = sequelize.define('ticket',
    {
        ticket_id :
        {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        ticket_priority :
        {
            type : Sequelize.ENUM,
            defaultValue : process.env.open,
            values : [process.env.open, process.env.closed, process.env.resolved, process.env.working, process.env.normal]
        },
        title :
        {
            type : Sequelize.STRING,
            required : true,            
        },
        description :
        {
            type : Sequelize.STRING,
            required : true
        },
        status : 
        {
            type : Sequelize.ENUM,
            required : true,
            defaultValue : process.env.open,
            values : [process.env.open, process.env.blocked, process.env.closed]
        },
        reporter : {
            type : Sequelize.STRING,
            required : true
        },
        assignee : {
            type : Sequelize.STRING,
            required : true
        },
        created_on :
        {
            type : Sequelize.DATEONLY,
            immutable : true,
            defaultValue : () => {return Date.now()} 
        },
        updated_on :
        {
            type : Sequelize.DATEONLY,
            defaultValue : () => { return Date.now() }
        },
    },
    {
        timestamps : false
    });
    return Ticket;
};