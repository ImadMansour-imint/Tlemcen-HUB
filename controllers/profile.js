const User = require("../models/Users");
const Project = require('../models/Project')
const db = require("../config/database");
const path = require('path')
const Pub = require('../models/Pub')

const sequelize = require('sequelize')
const Op = sequelize.Op


exports.myProfile = async(req, res) => {
    const id = req.session._id
    const user = await User.findOne({where : {id : id}})
    user.getProjects()
    .then(projects => {
        return Pub.findAll({where:{added: true}}).then(pubs => {
            res.render('myProfile',{
                profile : {
                    name : user.userName,
                    avatar : user.avatar,
                    facebook : user.fb ,
                    linkedin : user.linkedIn,
                    github : user.gitHub,
                    bio : user.bio,
                    email : user.email,
                    id:user.id,
                    skills: JSON.parse(user.skills),
                    
                },
                projectsNumber: projects.length,
                projs:projects,
                pubs: pubs
            })
        })
        
    })
    .catch(err => {
        console.log(err)
    })
   
}

exports.updateProfile = (req , res)=>{

    const id = req.session._id
    const fb = req.body.facebook
    const linkedIn = req.body.linkedin
    const gitHub = req.body.github
    const bio = req.body.bio

    User.update(
        {
            fb,
            linkedIn,
            gitHub,
            bio
    
        } ,
        {where :{
            id : id
    
    
}} ).then(console.log('userrrrrrrr'))
    res.redirect('/me')
    }

    exports.updateSkills = (req , res)=>{
        const id = req.session._id
        const skills = req.body.skills
        console.log(id)
        console.log(skills+"update")
        User.update(
            {skills} ,
            {where :{id : id}} )
            .then(user => console.log(user.skills) )
            res.redirect('/me')

    }

    exports.deleteSkills = async(req,res)=>{
        const id = req.session._id
        const skillDel = req.params.skill
        console.log(id)
        const user = await User.findOne({ where :{id : id} });
            if (user === null) {
                console.log("User not found");
            }
             else {
                var skillpast =JSON.parse(user.skills) 
                newskills = Object.values(skillpast).filter(item => item !== skillDel)
                newskills = JSON.stringify(newskills)
                user.update(
                    {skills : newskills} ,
                    {where :{id : id}} )
                    .then(user => console.log(user.skills) )
                     }
            res.redirect('/me')
      }

    exports.getProfile = async(req , res) =>{
        //if requested profile is myprofile
        // if (req.session._id == req.params.id) return redirect('/me')
        //if requested profile isn't mine
        const id = req.params.id
        const user = await User.findOne({where : {id : id}})
    
        res.render('profile',{
            profile : {
                name : user.userName,
                avatar : user.avatar,
                facebook : user.fb ,
                linkedin : user.linkedIn,
                github : user.gitHub,
                bio : user.bio,
                id:user.id,
                skills : JSON.parse(user.skills)
            },
        })
    }

    exports.searchDevOrPrj = (req,res)=>{
        query = req.body.search
        User.findAll({where: {userName: query}})
        .then(users => {
            if(users.length != 0 ){
                console.log(users);
                res.render('users-list', {
                    pageTitle:'Users',
                    path:'/searchUser',
                    users: users
                })
            }
            else{
                project = req.body.search
                Project.findAll({where:  {[Op.or]:[{title:'%' + project + '%'},{description:'%' + project + '%'}]}})
                .then(projects => {
                    if(projects.length != 0){                    res.render('project/projects-list', {
                        pageTitle:'Projects',
                        path:'/searchProject',
                        projs: projects
                    })}
                    else res.redirect('/me')

                })
            }

        })
        .catch(err => console.log(err))
          
    }