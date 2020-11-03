const Project = require('../models/Project')

const User = require('../models/Users')

const path = require('path')

const { validationResult } = require('express-validator/check')

exports.getAddProject = (req, res, next) => {
    res.render('project/add-project', {
        pageTitle : 'Add Your New Project!',
        path: '/add-project',
        hasError: false,
        errorMessage: null,
        validationErrors: []
    })
}

exports.postAddProject = (req, res, next) => {
    const title = req.body.title
    const projectType = req.body.projectType
    const description = req.body.description
    const projectImage = req.files.image
    const projectvideo = req.files.video
    const url = path.resolve(__dirname , '../public/projectsFiles/', req.session.id + '-' + title + '.jpeg')
    const imageUrl = '/projectsFiles/' + req.session.id + '-' + title + '.jpeg'
    const url1 = path.resolve(__dirname , '../public/projectsFiles/', req.session.id + '-videoOf' + title + '.mp4')
    const videoUrl = '/projectsFiles/' + req.session.id + '-videoOf' + title + '.mp4'
    console.log(projectvideo)
    projectImage.mv(url,(err) => {
      if (err) {
        return res.status(422).render('project/add-project', {
          pageTitle: 'Add Your New Project!',
          path: '/add-project',
          project: {
            title: title,
            projectType: projectType,
            description: description
          },
          errorMessage: 'Attached file is not an image.',
          validationErrors: []
        });
      } else {
        console.log('image uploaded successfully')
      }
      
    })

    projectvideo.mv(url1,(err) => {
      console.log(err)
      if (err) {
        return res.status(422).render('project/add-project', {
          pageTitle: 'Add Your New Project!',
          path: '/add-project',
          project: {
            title: title,
            projectType: projectType,
            description: description
          },
          errorMessage: 'Attached file is not a video.',
          validationErrors: []
        });
      } else {
        console.log('video uploaded successfully')
      }
      
    })
      
      let errors = []
     errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('project/add-project', {
          pageTitle: 'Add Your New Project!',
          path: '/add-project',
          hasError: true,
          project: {
            title: title,
            projectType: projectType,
            description: description
          },
          errorMessage: 'invalid ' + errors.array()[0].param + ' value',
          validationErrors: errors.array()
        });
      }
    User.findByPk(req.session._id)
    .then(user => {
      if (!user) {
        res.redirect('/')
      }
     return user.createProject({
        title: title,
        projectType: projectType,
        description: description,
        imagePath: imageUrl,
        videoPath: videoUrl,
        likesNumber:0,
        rating: 0,
        numberOfRaters: 0,
        projectUser: user.userName,
        userAvatar: user.avatar
    })
    .then(result => {
        console.log('project created successfully')
        res.redirect('/projects')
    })
    })
    .catch(err => {
      console.log(err)
    });
    
     
}

exports.getProjects = (req, res, nexy) => {
      const compare = (a,b) => {
          const ratingA = a.rating / a.numberOfRaters
          const ratingB = b.rating / b.numberOfRaters
          let comparison = 0
          if(ratingA > ratingB) {
            comparison = 1
          } else if (ratingA < ratingB) {
            comparison = -1
          }
          return comparison
      }
      Project.findAll()
      .then(projects => {
        projects.sort(compare)
        console.log(projects)
        res.render('project/projects-list', {
            projs: projects,
            pageTitle: 'All Projets',
            path: '/projects'
          });
      })
      .catch(err => {
          console.log(err)
      })
      
    }
exports.getProject = (req, res, next) => {
    projectId = req.params.projectId
    Project.findByPk(projectId)
    .then(project => {
        project.getUsers().then(users => {
          res.render('project/project-description', {
            pageTitle: project.title,
            path: '/projects',
            project: project,
            user: users[0]
        })
        })
        
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getEditProject = (req, res, next) => {

}
