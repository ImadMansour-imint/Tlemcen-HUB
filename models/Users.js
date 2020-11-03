const db = require('../config/database')
const Sequelize = require('sequelize')
    

const Users = db.define('Users' , {
    
    role: {
        type: Sequelize.ENUM,
        values: ['student', 'visitor']
    },
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    userName : {
        type : Sequelize.STRING , 
        allowNull : false
    },
    firstName : {
        type : Sequelize.STRING , 
        allowNull : false
    },
    lastName : {
        type : Sequelize.STRING , 
        allowNull : false
    },
    email : {
        type : Sequelize.STRING , 
        allowNull : false
    },
    password : {
        type : Sequelize.STRING , 
        allowNull : false
    },
    bio : {
        type : Sequelize.STRING , 
    },
    avatar : {
        type : Sequelize.STRING, 
    },
    skills : {
        type : Sequelize.STRING , 
    },
    fb : {
        type : Sequelize.STRING , 
    }, 
    linkedIn : {
        type : Sequelize.STRING , 
    },
    gitHub : {
        type : Sequelize.STRING , 
    },
    // paranoid: true,
   
})

db.sync({ forced: true });


 module.exports = Users