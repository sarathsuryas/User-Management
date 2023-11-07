const{Admin}=require('../model/config')
const{User}=require('../model/config')

const adminLogin=async(req,res,next)=>{
 //console.log(req.session.admin);
    if(req.session.admin){
     return res.redirect('/admin/loginsub')
    }
  error=''
  res.render('admin login',{error})
}

const loginsubget = async(req,res)=>{
  if(!req.session.admin){
    return res.redirect('/admin')
   }
   try{
     let query=req.query.search || ''
    //const result=await User.find({username:query})
    result=''
    const userData=await User.find({})
     return res.render('adminhome',{userData,result})
   }catch(err){
    console.log(err);
  }
  
}

const loginsub=async(req,res,next)=>{
  console.log(req.body);
const{email,password}=req.body;

try{
  const admin=await Admin.findOne({email})
  if(!admin){
    return res.render('admin login',{error:'email not valid'})
  }
  if(password===admin.password){
    req.session.admin=admin.email;
    console.log(req.session.admin);
    const userData=await User.find()
     return res.redirect('/admin/loginsub')
    //return res.render('adminhome',{result:[],userData})
  }else{
    return res.render('admin login',{error:'password not valid'})
  }
}catch(error){
 console.log(error);
}

}
const adduser=async(req,res,next)=>{
  const{username,email,password}=req.body;
         
  try{
     const existingUser=await User.findOne({email})
     
     if(existingUser){
      
      
     }
     // If email is unique, create a new user
    const insertData = await User.create({ username, email, password });
    
    if(insertData){
      console.log('User signed up and data inserted');
      console.log(insertData);
      
      return res.redirect('/admin/loginsub')
      
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const removeuser=async(req,res,next)=>{
  const userId=req.query.id;
  console.log(userId);
  const deleteData=await User.findByIdAndRemove({_id:userId});
  if(deleteData)
  {
    console.log('User deleted');
    return res.status(201).json({message:'Deleted sucess fully'})
  }
}
const updatepage=async(req,res,next)=>{
  const userId=req.params.id;
  console.log(userId);
  const userData=await User.findOne({_id:userId});

return res.render('admin update page',{userData})
}

const updateuser=async(req,res,next)=>{
const {username,email,userId}=req.body;
console.log('-------------------');
console.log(username);
console.log(email);
console.log(userId);
const updatedData = await User.updateOne({_id:userId}, {username:username,email:email });
console.log(updatedData);
if (updatedData)
{
  console.log('Data updated successfully');
  return res.redirect('/admin/loginsub')
}
 else 
 {
  console.log('No data updated. User not found or no changes made.');
  res.status(404).json({ message: 'User not found or no changes made' });
}
}


const adminLogout = async (req, res, next) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.redirect('/admin');
  });
};

const searchuserget=async (req,res)=>{
  try{
    let query=req.query.search || ''
    const result=await User.find({username:query})
    const userData=await User.find({})
    return res.render('adminhome',{userData,result})
  }catch(err){
    console.log(err);
  }

}

const searchuser = async (req,res,next)=>{
  try{
 console.log(req.body.username);
                
const userData=await User.find()         

  }catch(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
  }

}


module.exports={adminLogin,loginsub,adduser,removeuser,updatepage,updateuser,loginsubget,adminLogout,searchuser,searchuserget};