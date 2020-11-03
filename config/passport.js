const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Users = require('../models/Users')

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField : 'email'} , async(email ,password, done)=>{
            const user = await Users.findOne({
                where : {email : email}
            })
            if(!user){
                return done(
                            null ,
                             false ,
                              {message : 'this email is not registred'}
                        )   
            }
            bcrypt.compare(password , user.password)
                .then(isMatch =>{
                    if(isMatch){
                        req
                        return done(
                                    null , 
                                    user
                                    )
                    }else{
                        return done(
                                    null , 
                                    false , 
                                    {message : 'password incorrect'}
                               
                                )
                    }
                } )
            

        })
    )
    passport.serializeUser((user , done)=>{
        done(null , user.id)
    })

    passport.deserializeUser((id , done)=>{
        Users.findByPk(id).then(user => {
            if (user) {
                done(null, user.dataValues);
            } else {
                done(null, user);
            }
        });
    })
}