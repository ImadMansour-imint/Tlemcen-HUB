const Sequelize = require('sequelize')

const sequelize = require('../config/database');
const { STRING } = require('sequelize');

const Notification = sequelize.define('notification', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    content: {
        type: Sequelize.STRING
    },
    notifier: {
        type: Sequelize.STRING
    },
    notifierId: {
        type: Sequelize.STRING
    },
    notifierAvatar: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    projectUser: {
        type: Sequelize.STRING
    },
    projectTitle: {
        type: Sequelize.STRING
    }
});

module.exports = Notification