const User = require("../models/Users");
const Project = require('../models/Project')
const db = require("../config/database");
const path = require('path')
const Pub = require('../models/Pub')

exports.myProfile = async(req, res) => {
    const id = req.session._id
    console.log(id)
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
                    skills: JSON.parse(user.skills),
                    
                },
                projs : projects,
                projectsNumber: projects.length,
                pubs: pubs
            })
        })
        
    })
    .catch(err => {
        console.log(err)
    })
   
}

exports.updateProfile = (req , res)=>{
    console.log('userrrrrrrr')

    const id = req.session._id
    const fb = req.body.facebook
    const linkedIn = req.body.linkedin
    const gitHub = req.body.github
    const bio = req.body.bio
    console.log('userrrrrrrr')

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
        console.log(skills)
        User.update(
            {skills} ,
            {where :{id : id}} )
            .then(user => console.log(user.skills) )
            res.redirect('/me')

    }

    exports.getProfile = async(req , res) =>{
        console.log(req)
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
                skills : JSON.parse(user.skills)
            },
        })
    }