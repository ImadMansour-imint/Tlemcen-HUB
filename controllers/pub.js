const Pub = require('../models/Pub')
const path = require('path')

exports.postPub = (req, res, next) => {
    const pubImage = req.files.pub
    const imageUrl = '/pubFiles/' + pubImage.name + '.jpeg'
    const url = path.resolve(__dirname , '../public/pubFiles/' + pubImage.name + '.jpeg')
    pubImage.mv(url, (err) => {
        console.log(err)
        Pub.create({
            imagePath: imageUrl,
            added: false 
        })
        .then(result => {
            console.log('pub added successfully')
            res.redirect('/notifications')
        })
        .catch(err => {
            console.log(err)
        })
    })
    
}

exports.deletePub = (req, res, next) => {
    pub = req.params.pub
    Pub.findByPk(pub)
    .then(pub => {
    if(pub){
      return pub.destroy({where: {id: pub}}).then(result => {
        res.redirect('/admin')
      })
    }
   })
   .catch(err => {
    console.log(err)
  })

}
exports.acceptPub = (req, res, next) => {
    pub = req.params.pub
    Pub.update({added: true}, {where:{ id: pub}})
    .then(result => {
        console.log('pub added successfully')
        res.redirect('/admin')
    })
    .catch(err => {
        console.log(err)
    })
}