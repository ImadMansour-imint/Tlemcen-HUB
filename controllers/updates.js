

exports.updateProfile = (req , res)=>{
const id = req.session.id
const {facebook , github , linkedin , bio} = req.body
User.update(
    {
        facebook,
        github,
        linkedin,
        bio,

    } ,
    {where :{
        id : id
    }} )
}

exports.updateAvatar = (req , res)=>{
    const id = req.session.id
    const avatar = req.files.avatar
    let user = await Users.findAll({
        where : {
            id : id
        }
    })
    avatar.mv(path.resolve(__dirname , '../public/users/avatar' , User.username , '-' , user.id , 'jpeg' ))
    Users.update(
        {
            avatar : 'users/avatar'+User.username+'-'+user.id+'jpeg'  
        },
        {
            where : { id : id }
        }
    )
}

exports.updateBio = (req , res)=>{
    const id = req.session.id
    const bio = req.query.bio
    Users.update(
        {
            bio : bio
        },
        {
            where : { id : id }
        }
    )   
}

exports.updateTitle = (req , res)=>{
    const id = req.session.id
    const title = req.query.title
    Users.update(
        {
            title : title
        },
        {
            where : { id : id }
        }
    )   
}

exports.updateFb = (req , res)=>{
    const id = req.session.id
    const fb = req.query.facebook
    Users.update(
        {
            fb : fb
        },
        {
            where : { id : id }
        }
    )
    
}

exports.updateGithub = (req , res)=>{
    const id = req.session.id
    const gitHub = req.query.gitHub
    Users.update(
        {
            gitHub : gitHub
        },
        {
            where : { id : id }
        }
    )
}

exports.updateLinkedin = (req , res)=>{
    const id = req.session.id
    const linkedin = req.query.linkedin
    Users.update(
        {
            linkedin : linkedin
        },
        {
            where : { id : id }
        }
    )   
}


exports.updateSkills = (req , res)=>{

}

