const User = require('../models/Users')
module.exports = (req , res)=>{
    User.findAll()
    .then(users => {
        res.render('index', {
            users: users
        })
    })
    .catch(err => {
        console.log(err)
    })
    
}