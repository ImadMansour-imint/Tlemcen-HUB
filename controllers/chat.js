var express = require('express');
var router = express.Router();
const Chat = require('../models/Chat')
const sequelize = require('sequelize')
const Op = sequelize.Op
/* Enter chat room with "name" */
//  exports.chatMsg =  (req, res, next) => {
//     const sess =   req.session;
//     sess.name =  req.query.name;
//      const  receiver  =  req.query.receiver;
//     console.log( req.query.name + "receiver");
//     console.log( req.query.receiver);



// if(req.query.receiver && req.query.name ){
//   Chat.findAll({where : [{msgFrom : req.query.name},{msgTo : req.query.receiver}]} )
//   .then(chamy=>
//     return Chat.findAll({where : [{msgTo : req.query.name},{msgFrom : req.query.receiver}]} )

//   )
//   .then( messages  =>
//     res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver,msg:messages ,msghim:chatmsg})
//   ).catch(err=>
//     console.log(err)
//   )
// }

//     // res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver})

// };


//  exports.chatMsg =  (req, res, next) => {
//     const sess =   req.session;
//     sess.name =  req.query.name;
//      const  receiver  =  req.query.receiver;
// if(req.query.receiver && req.query.name ){
//   Chat.findAll({where : [{msgFrom : req.query.name},{msgTo : req.query.receiver}]} )
//   .then(chatmy=>{
//     return Chat.findAll({where : [{msgTo : req.query.name},{msgFrom : req.query.receiver}]} )
//     .then(chathim=>{
//       res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver,msg:chatmy ,msghim:chathim})
//     })})}};



exports.chatMsg =  (req, res, next) => {
  const sess =   req.session;
  sess.name =  req.query.name;
   const  receiver  =  req.query.receiver;
if(req.query.receiver && req.query.name ){
  Chat.findAll({
    where: {
      [Op.or]: [{msgTo: req.query.receiver}, {msgTo: req.query.name},{msgFrom: req.query.receiver}, {msgFrom: req.query.name}]
    },
    limit: 10, order: [['createdAt', 'DESC']]
  }).then(
    messages=>
    res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver,msg:messages })
  )
  }
  // res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver})

};

exports.userMsg = (req, res, next) => {
  var sess = req.session;
  sess.name = req.query.name;
  console.log(req.session._id);
  sess.save();
  res.render('users2', {title: "Connected users", name: sess.name});
  

};
 
// exports.myProfile = async(req, res) => {
//   const id = req.session._id
//   const user = await User.findOne({where : {id : id}})
//   user.getProjects()
//   .then(projects => {
//       return Pub.findAll({where:{added: true}}).then(pubs => {
//           res.render('myProfile',{
//               profile : {
//                   name : user.userName,
//                   avatar : user.avatar,
//                   facebook : user.fb ,
//                   linkedin : user.linkedIn,
//                   github : user.gitHub,
//                   bio : user.bio,
//                   email : user.email,
//                   id:user.id,
//                   skills: JSON.parse(user.skills),
                  
//               },
//               isLoggedIn: req.session.isLoggedIn,
//               projectsNumber: projects.length,
//               projs:projects,
//               pubs: pubs
//           })
//       })
//   })

//   .catch(err => {
//       console.log(err)
//   })
 
// }



exports.welcomeMsg  = (req, res, next) => {
  var sess = req.session;
  // if (!sess.name)
  //   res.render('welcome2', {title: "Simple One-to-one chat app | Welcome"});
  // else res.render('users2', {title: "Connected users", name: sess.name});
  
};

