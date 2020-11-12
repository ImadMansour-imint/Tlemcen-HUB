// needed modules 
const express = require('express')
const app = express()
const expressEdge =require('express-edge').engine;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const connectFlash = require('connect-flash')
const passport = require('passport')
const multer = require('multer')
const { body } = require('express-validator/check')
const User = require('./models/Users')
const Project = require('./models/Project')
const Notification = require('./models/Notification')







//db configs
//connect to the database
const db = require("./config/database");
db.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error(err);
 });

//passport config
require('./config/passport')(passport)





//middlewares

// settingUp middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator())
app.use(fileUpload());
app.use(expressEdge);
app.set("views", __dirname + "/views");
app.use(expressSession({
  secret: 'keyboard cat',
  cookie: {
    maxAge:269999999999
  },
  saveUninitialized: true,
  resave:true
}))

//passport stup
app.use(passport.initialize());
app.use(passport.session());

//flash setup
app.use(connectFlash())

//
app.use((req , res  , next )=>{
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error = req.flash('error')
  next()

})

//database associations
Project.hasMany(Notification)
Notification.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' })

User.belongsToMany(Project, { through: 'User_Projects' })
Project.belongsToMany(User, { through: 'User_Projects' });


//controllers
const homeRedirect = require('./controllers/homePage')
const registerController = require('./controllers/register')
const loginController = require('./controllers/login')
const profileController = require('./controllers/profile')
const adminController = require('./controllers/admin ')
const pubController = require('./controllers/pub')

//projectControllers

const projectController = require('./controllers/project')
const isAuth =  require('./middlewares/isAuthenticated')

//searchController

const searchController = require('./controllers/search')

//notificationController

const notificationController = require('./controllers/notification')

const searchFromHome = require("./controllers/searchFromHome");
const { get } = require('jquery');

//routes
app.get('/', homeRedirect)
app.post('/auth/register' , registerController.register)
app.post('/auth/completeRegister' , registerController.registerComplete)
app.post('/auth/login' ,loginController.loginController)
app.get('/auth/logout' ,loginController.logoutController)

app.get('/me' ,profileController.myProfile)
app.post('/me/updateSkills' , profileController.updateSkills)
app.get('/me/:skill' , profileController.deleteSkills)
app.post('/updateMe' ,profileController.updateProfile)
app.get('/profile/:id' , profileController.getProfile)



//projectRoutes

app.get('/add-project', projectController.getAddProject)

app.post('/add-project',[body('title').isString()
.isLength({min: 3})
.trim(),
body('description').isString()
.isLength({min:5, max:400})
.trim()], projectController.postAddProject)

app.get('/projects', projectController.getProjects)

app.get('/projects/:projectId',  projectController.getProject)

//search 
app.get('/connectedSearch', searchController.getSearch)

app.post('/searchProject', searchController.postSearchProject)

app.post('/searchUser', searchController.postSearchUser)

app.get('/search/:type', searchFromHome.getSearchFromHome)

//Notifications

app.get('/notifications', notificationController.getNotify)

app.get('/add-comment/:projectId', notificationController.getAddComment)

app.post('/add-comment', notificationController.postAddComment)

app.post('/add-like/:projectId', notificationController.addLike)

app.post('/add-rating/:info', notificationController.addRating)

app.get('/admin', adminController.adminLogIn)

app.post('/admin/:info', adminController.delete)

app.post('/addPub',pubController.postPub)

app.post('/delete/:pub', pubController.deletePub)
app.post('/accept/:pub', pubController.acceptPub)


//server

  const port = process.env.port || 3000
  app.listen(port , ()=> console.log('Server listening on port '+port))

