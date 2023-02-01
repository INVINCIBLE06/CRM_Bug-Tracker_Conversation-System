const constants = require("../utils/constants");


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
            defaultValue : constants.ticketPriority.normal,
            values : [constants.ticketPriority.normal, constants.ticketPriority.urgent]
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
            defaultValue : constants.ticketStatus.open,
            values : [constants.ticketStatus.open, constants.ticketStatus.closed,constants.ticketStatus.pending,constants.ticketStatus.working, constants.ticketStatus.resolved]
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
            type : Sequelize.DATE,
            immutable : true,
            defaultValue : () => {return Date.now()} 
        },
        updated_on :
        {
            type : Sequelize.DATE,
            defaultValue : () => { return Date.now() }
        },
    },
    {
        timestamps : false
    });
    return Ticket;
};