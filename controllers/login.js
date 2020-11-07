
// const passport = require('passport')

// exports.loginController = (req , res, next ) => {
//     passport.authenticate('local' ,{
//         successRedirect : '/profile',
//         failureRedirect : '/',
//         failureFlash : true,
//     })(req,res,next)
// }
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
exports.loginController = async (req,res)=>{
    const {email,password}=req.body
    //verify if email exist
    let user = await User.findOne({ where : {
        email : email , 
        }})
    if(user){

        // if email exist compare password
        bcrypt.compare(password , user.password , (error , result)=>{
            //if password match
            if (result){
                req.session.isLoggedIn= true
                req.session._id = user.id
                console.log('user is logged in successfully')
                if(email == "admin@univ-tlemcen.dz") {
                    res.redirect('/admin')
                } else {
                    res.redirect('/me')
                }
                
            } //if password didn't match
            else{
                res.render('index' , {
                    
                    error : {
                        msg : 'password invalid'
                    }
                })
            }
        })
    } // if email doesn't existe
    else{
        res.render('index' , {
            error : {
                signinError : false,
                loginError : true,
                msg : 'email invalid'
            }
        })
    }
}

exports.logoutController = async (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}