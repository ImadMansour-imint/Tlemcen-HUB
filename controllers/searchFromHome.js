const Project = require("../models/Project")

exports.getSearchFromHome = (req, res, next) => {
    const type = req.params.type
    Project.findAll({where: {projectType: type}})
    .then(projects => {
        res.render('searchFromHome', {
            projs: projects,
            path: '/search'
        })
    })
    .catch()
}