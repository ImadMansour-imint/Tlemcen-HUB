const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Pub = sequelize.define('pub', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    imagePath: {
        type: Sequelize.STRING,
    },
    added: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Pub