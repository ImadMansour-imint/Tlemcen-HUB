const User = require('../models/Users')
const Project = require('../models/Project')
const Pub = require('../models/Pub')

exports.adminLogIn = (req,res,next) => {
  User.findAll()
  .then(users => {
    return Project.findAll()
    .then(projects => {
      return Pub.findAll({where: {added: false}})
      .then(notAddedPubs => {
        return Pub.findAll({where: {added: true}})
        .then(addedPubs => {
          res.render('admin',{
            projects: projects,
            users: users,
            addedPubs: addedPubs,
            notAddedPubs: notAddedPubs
          })
        })
      })
    })
  }).catch(err => {
    console.log(err)
  })
}
exports.delete = (req,res,next) => {
  const info = req.params.info
  Project.findByPk(info)
  .then(project => {
    if(project){
      return Project.destroy({where: {id: info}}).then(result => {
        res.redirect('/admin')
      })
    }else {
       return User.destroy({where: {id: info}}).then(result => {
        res.redirect('/admin')
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
}
