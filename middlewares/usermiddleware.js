const{User}=require('../model/config');


const userlogin=async(req,res,next)=>{
  
  if(req.session.user){
   return res.redirect('/home')
  }
 let error =''
 if(req.session.error){
  error = req.session.error
 }
res.render('user_login',{error})

}
const usersignup=async(req,res,next)=>{
  if(req.session.user){
    res.redirect('/home')
  }
  error=''
  res.render('user signup',{error})
  
  }

  //HOME PAGE
const userhome=async(req,res,next)=>{
  if(!req.session.user){
     res.redirect('/')
  }
  try{
  res.render('userhome')
  }catch(err){
    console.log(err);
  }
}



const signupsub = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect('/signup')
    }

    // If email is unique, create a new user
    const insertData = await User.create({ username, email, password });

    if (insertData) {
      req.session.user = email;
      console.log(insertData);
      console.log('User signed up and data inserted');
      res.redirect('/home')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const loginsub=async(req,res,next)=>{
 console.log(req.body);
const {email,password}=req.body;
try{
const user=await User.findOne({email})
if (!user) {
  return res.render('user_login',{error:'Invalid email'})
}

  if(password===user.password){
    req.session.user=email;
    console.log('user authenticated')
    return res.redirect('/home')
  }else {
    req.session.error = 'Invalid password';
    res.redirect('/')
    // res.render('user_login',)
  }
}
catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
}

const userlogout=async(req,res,next)=>{

  req.session.destroy((err)=>{
    if(err){
      console.log(err);
    }
  })
  res.redirect('/')
 
}


module.exports={userlogin,usersignup,userhome,signupsub,loginsub,userlogout};
