var express = require('express');
var router = express.Router();
const middleware=require('../middlewares/usermiddleware');
const { loginsub } = require('../middlewares/adminmiddleware');


/* GET users listing. */
router.get('/home',middleware.userhome)
router.get('/',middleware.userlogin);
router.post('/',middleware.loginsub)

router.get('/signup',middleware.usersignup);

router.post('/signupsub',middleware.signupsub)

router.get('/logout',middleware.userlogout);
module.exports = router;
