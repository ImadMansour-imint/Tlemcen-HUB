const User = require('../models/Users')

const Project = require('../models/Project')

const Notification = require('../models/Notification')

const sequelize = require('sequelize')
const Pub = require('../models/Pub')

const Op = sequelize.Op





exports.getNotify = (req, res, next) => {
    const id = req.session._id
    Notification.findAll({where: {
        projectUser: id
    }})
    .then(notifications => {
        return Pub.findAll({where:{added: true}}).then(pubs => {
            res.render('project/notification', {
                path:'/notifications',
                notifications: notifications,
                pubs: pubs
            })
        })
        })
    .catch(err => {
        console.log(err)
    })
            
}
            
    
    
    


exports.getAddComment = (req, res, next) => {
    const projectId = req.params.projectId
    Project.findByPk(projectId)
    .then(project => {
        console.log(project)
        project.getNotifications({where: {type: 'comment'}}).then(notifications => {
            res.render('project/add-comment', {
                project: project,
                path: '/add-comment',
                commentNotifications: notifications.reverse(),
            })        
        })
    })
    .catch(err => {
        console.log(err)
    })

}

exports.postAddComment = (req, res, next) => {
    const projectId = req.body.projectId
    Project.findByPk(projectId)
    .then(project => {
        const comment = req.body.comment
        const id = req.session._id
        User.findByPk(id)
        .then(user => {
            console.log(user.avatar)
            console.log(project.user_id)
            return project.getUsers()
            .then(projectUsers => {
            return project.createNotification({
                content: comment,
                type:'comment',
                notifierId: id,
                notifierAvatar: user.avatar,
                notifier: user.userName,
                date: new Date(),
                projectUser: projectUsers[0].id,
                projectTitle: project.title
            }).then(result => {
                console.log('content added successfully')
                res.redirect('/add-comment/' + project.id)
            }) 
            })
            .then()
            
        })
        
    })
    .catch(err => {
        console.log(err)
    })
   
}

/*exports.addLike = (req, res, next) => {
    const projectId = req.params.projectId 
    const haveLiked = false
    Project.findByPk(projectId)
    .then(project => {
        console.log(project.id)
            return User.findByPk(req.session._id).then(user => {
                console.log(user.id)
                console.log(project)
                return project.getUsers()
            .then(projectUsers => {
                console.log(projectUsers)
                return project.getNotifications({where: {[Op.and]: [{type:"like"},{notifierId: req.session._id}]}})
                .then(notifications => {
                    console.log(notifications)
                    if(notifications.length() > 0) {
                        haveLiked = true
                        res.status(200).json({message: "already liked!"})
                    }else {
                        return project.createNotification({
                            content: '',
                            type: 'like',
                            notifierAvatar:user.avatar,
                            notifier: user.userName,
                            notifierId:req.session._id,
                            date: new Date(),
                            projectUser: projectUsers[0].id,
                            projectTitle: project.title
                        })
                        .then(result => {
                            return  Project.update( {likesNumber: project.likesNumber + 1}, { where: {id: projectId}, individualHooks: true})
                            .then(result => {
                            console.log('like added successfully')
                            res.status(200).json({message: "project updated successfully!"})
                        })
                    })
                    }
                    
                })
                    
                })
                
            
            
        })
            })
            
    .catch(err => {
        res.status(500).json({message: "something went wrong."})
    })
}*/
exports.addLike = (req, res, next) => {
    const projectId =req.params.projectId
    Project.findByPk(projectId)
    .then(project => {
        console.log(project.id)
        return project.getUsers()
        .then(projectUsers => {
            console.log(projectUsers)
            return User.findByPk(req.session._id)
            .then(user => {
                return project.getNotifications({where: {[Op.and]: [{type:"like"},{notifierId: req.session._id}]}})
                .then(notifications => {
                    console.log(notifications)
                    if(notifications.length> 0) {
                        res.status(200).json({message: "already liked!"})
                    } else {
                        return project.createNotification({
                            content: '',
                            type: 'like',
                            notifierAvatar:user.avatar,
                            notifier: user.userName,
                            notifierId:req.session._id,
                            date: new Date(),
                            projectUser: projectUsers[0].id,
                            projectTitle: project.title
                        })
                        .then(result => {
                            Project.update( {likesNumber: project.likesNumber + 1}, { where: {id: projectId}, individualHooks: true})
                            .then(result => {
                            console.log('like added successfully')
                            res.status(200).json({message: "project updated successfully!"})
                        })
                        })
                    }
                    
                })
            })
            
        })
    })
    .catch(err => {
        console.log(err)
    })
}
exports.addRating = (req, res, next) => {
    const info = req.params.info
    const arrayInfo = info.split(':')
    const projectId = arrayInfo[0]
    const ratingValue = parseInt(arrayInfo[1])
    console.log(ratingValue)
    User.findByPk(req.session._id)
    .then(user => {
        return Project.findByPk(projectId)
        .then(project => {
            return project.getUsers()
            .then(projectUsers => {
                return Project.update({rating: parseInt(project.rating) + ratingValue }, { where: {id: projectId}, individualHooks: true})
            .then(result => {
                return Project.update({numberOfRaters: parseInt(project.numberOfRaters) + 1 }, { where: {id: projectId}, individualHooks: true})
                .then(update => {
                    return project.createNotification({
                        content: ratingValue,
                        type: 'rating',
                        notifierId: req.session._id,
                        notifierAvatar: user.avatar,
                        notifier: user.userName,
                        date: new Date(),
                        projectUser: projectUsers[0].id,
                        projectTitle: project.title
                    })
                    .then(result => {
                        
                        res.status(200).json({message: "project updated successfully!"})
                    })
                })
                
            })
            })
            
        })
        .catch(err => {
            res.status(500).json({message: "something went wrong."})
        })
    })
    
}