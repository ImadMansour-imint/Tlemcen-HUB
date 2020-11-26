const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Chat = sequelize.define('chat', {
    msgFrom: {
        type: Sequelize.STRING,
    },
    msgTo: {
        type: Sequelize.STRING,
    },
    msg: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
});

module.exports = Chat