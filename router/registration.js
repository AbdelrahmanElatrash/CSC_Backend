const express=require('express');
const router=express.Router();
// const pg=require('pg');

//  database connection ................................................

// require('dotenv').config({ path: '.dotenv' });
// const dataBaseURL=process.env.DATABASE_URL
// const db = new pg.Client(dataBaseURL);  

// const db=new pg.Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'registrationdb',
//     password: 'new_password',
//     port: 5432,
//   });

// db.connect()

//  ###  routes   #############################################################

const conroler=require('../controler/controler')

router.post('/register', conroler.handleRegistration);
router.get('/getdata', conroler.handleGetData);
router.get('/getassign', conroler.handleGetassign);
router.post('/addsubjecto', conroler.handleAddSubject);

router.post('/login',conroler.logIn)
router.post('/addsubject',conroler.addsubject)
router.get('/subjects', conroler.getSubject)
router.get('/sau',conroler.sau)
router.get('/students',conroler.getStudent)
router.post('/assign-subject',conroler.signSubject)
router.put('/updateuser/:id',conroler.userUpdate)
router.delete('/delete/:id', conroler.deleteUser )

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
  });
  
  
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });

//  exporting module  ...................................................
module.exports=router ;