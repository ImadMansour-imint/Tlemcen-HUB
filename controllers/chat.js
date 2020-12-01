var express = require('express');
var router = express.Router();
const Chat = require('../models/Chat')
const sequelize = require('sequelize')
const Op = sequelize.Op


exports.insertMsg = (req,res)=>{
  console.log(req.body.msg);
  console.log(req.session);
  Chat.create({
    msgFrom:req.session.name,
     msgTo:req.query.receiver,
     msg:req.body.msg,

})
  res.redirect("/profile/"+req.query.id)
}

exports.chatMsg =  (req, res, next) => {
  const sess =   req.session;
  sess.name =  req.query.name;
   const  receiver  =  req.query.receiver;

if(req.query.receiver && req.query.name ){
  Chat.findAll({
    where: {
      [Op.or]: [{msgTo: req.query.name}, {msgFrom: req.query.name}],
    },
    limit: 10,order: [['createdAt', 'DESC']]
  }).then(
      all =>{
        var tab = [];
          all.forEach(element => {
            if(element.msgTo == req.query.name)
            tab.push(element.msgFrom);
         else tab.push(element.msgTo)

        });
        let uniqueTab = [...new Set(tab)];
   
      Chat.findAll({
        where: {
          [Op.or]: [[{msgTo: req.query.receiver}, {msgFrom: req.query.name}],[{msgTo: req.query.name},{msgFrom: req.query.receiver}]],
        },
        limit: 130, order: [['createdAt', 'DESC']]
      }).then( messages=> {
        var tab2 = [];
        messages.forEach(element => {
          tab2.push(element);
      })
      tabreverse = tab2.reverse()
      res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver,msg:tabreverse ,allusers:uniqueTab })
      }   

  )}).catch(err=>console.log(err))
    }
  
  
  else{
     Chat.findAll({
      where: {
        [Op.or]: [{msgTo: req.query.name}, {msgFrom: req.query.name}],
      },
      limit: 30, order: [['createdAt', 'DESC']]
    }).then(all =>{
      var tab = [];
        all.forEach(element => {
          if(element.msgTo == req.query.name)
             tab.push(element.msgFrom);
          else tab.push(element.msgTo)
            })
            let uniqueTab = [...new Set(tab)];
            res.render('chat2', {title: "Chat with ", name:sess.name ,allusers:uniqueTab })



  }).catch(err=>console.log(err))
  // res.render('chat2', {title: "Chat with " + receiver, name:sess.name , receiver: receiver})

};
}
exports.userMsg = (req, res, next) => {
  var sess = req.session;
  sess.name = req.query.name;
  console.log(req.session._id);
  sess.save();
  res.render('users2', {title: "Connected users", name: sess.name});


};




exports.welcomeMsg  = (req, res, next) => {
  var sess = req.session;
  // if (!sess.name)
  //   res.render('welcome2', {title: "Simple One-to-one chat app | Welcome"});
  // else res.render('users2', {title: "Connected users", name: sess.name});

};

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
