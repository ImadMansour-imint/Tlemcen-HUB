
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const db = require("../config/database");
const path = require('path')

db.sync({ forced: true });
exports.register = async (req, res) => {
    // getting the user info from request body
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const passwordConf = req.body.passwordConf;
    const firstName = req.body.username;
    const lastName = req.body.username;
    const userName = req.body.username;

    // validating the info
    let validationErrors = [];

    req.checkBody("email", "Email is not valid")
        .notEmpty()
        .isEmail();
        if(!email.endsWith('@univ-tlemcen.dz')){
            const errorMail = {
                location :'body',
                param :'email',
                msg : 'sorry , you are not an Tlemcen university student',
                value : email
            }

            validationErrors.push(errorMail)
        }

    // if the email is valide
     if (req.validationErrors().length == 1 || !req.validationErrors()) {
         //cheking if email is unique
         let user = await Users.findAll({
             where: {
                 email: email,
             },
         });
         console.log(user)
         // if email is already used
         if (user.length != 0) {
             validationErrors.push({
                 location: "body",
                 param: "email",
                 msg: "Email already in use",
             });
         }
     }



    req.checkBody("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .isLength({ max: 30 })
        .withMessage("Password must not contain more then 30 characters");

    req.checkBody("passwordConf", "Passwords does not match").equals(
        req.body.password
    );

    const errors = req.validationErrors();
    // if there is some  inpute errors add them to validationErrors

    if (errors) {
        errors.forEach(err => {
            validationErrors.push(err);
        });
    }

    //if there is errors render the rgistration page with errors
    if (validationErrors.length > 0) {
        console.log(validationErrors);
        res.render('index', {
            errors : validationErrors,
        })
        // res.send(validationErrors)

    } else {
        //creating  userinfo

        let userinfo = {
            firstName,
            lastName,
            userName,
            email,
            password
        };

        // hashing the password before storing it
        bcrypt.hash(userinfo.password, 10, async (err, hash) => {
            if (err) {
                console.log("error :" + err);
            } else {
                userinfo.password = hash;
                user = await Users.create(userinfo);
                req.session._id = user.id
                console.log(req.session._id)
                res.render('afterSignin')
                console.log('userCreated successfully')
            }
        })
    }
}





exports.registerComplete = async (req , res)=>{
    //put avatar in var
    const image= req.files.avatar;
    const id =req.session._id
    // getting attibutes
    const {facebook , github , linkedin , phone }= req.body
    //moving avatar to specified folder
    // seraching user to update
    let user = await Users.findOne({
        where : {
            id : id
        }
    })
    console.log(id)
    const url = path.resolve(__dirname , '../public/users/avatars'  ,user.userName+'-'+user.id+'.jpeg')
    const avatarUrl = '/users/avatars/' + user.userName + '-' +user.id + '.jpeg'
    console.log(avatarUrl)
    image.mv(url,(err)=>{

        // ocject used to update
        const newUser ={
            avatar : avatarUrl,
            fb : facebook,
            linkedin : linkedin,
            github : github,
            phone :phone,
        }
         //update user
         Users.update(newUser , {where : {id : id}}).then((up)=>{
             res.redirect('/projects')
         })

     })


}
