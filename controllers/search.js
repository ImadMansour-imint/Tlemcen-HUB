const Project = require('../models/Project')
const User = require('../models/Users')
const sequelize = require('sequelize')
const Op = sequelize.Op
exports.getSearch = (req, res, next) => {
    res.render('search',{
        pageTitle:'find projects',
        path:'/search'
    })
}
exports.postSearchProject = (req, res, next) => {
    const project = req.body.project
    const type = req.body.type
    Project.findAll({where:  {[Op.or]: [{title:'%' + project + '%'},{description:'%' + project + '%'},{projectType:type }]}})
    .then(projects => {
        console.log(projects)
        res.render('project/projects-list', {
            pageTitle:'Projects',
            path:'/searchProject',
            projs: projects
        })
    })
    .catch(err => console.log(err))
}
exports.postSearchUser = (req, res, next) => {
    const userName= req.body.userName
    console.log(userName)
    User.findAll({where: {userName: userName}})
    .then(users => {
        console.log(users)
        res.render('users-list', {
            pageTitle:'Users',
            path:'/searchUser',
            users: users
        })
    })
    .catch(err => console.log(err))
}

