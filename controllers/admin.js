var express = require('express');
var router = express.Router();
const middleware=require('../middlewares/adminmiddleware')

/* GET home page. */
router.get('/',middleware.adminLogin);

router.get('/loginsub',middleware.loginsubget)

router.post('/loginsub',middleware.loginsub);

router.post('/adduser',middleware.adduser)
router.delete('/removeuser',middleware.removeuser);
router.get('/update/:id',middleware.updatepage)
router.post('/updateuser',middleware.updateuser)
router.get('/logout',middleware.adminLogout)
router.get('/search',middleware.searchuserget)
//router.post('/search',middleware.searchuser)
module.exports = router;
