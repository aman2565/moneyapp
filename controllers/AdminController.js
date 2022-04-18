const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Validator } = require('node-input-validator');
const db = require('../models');
const User = db.users; 
const App = db.apps; 
const sequelize = require('sequelize');
 
const Op = sequelize.Op;

module.exports = {

    dashboard : async (req ,res ) => {
        if(req.session.aid){

            const user_count = await User.count({
                where:{
                    id:{
                        [Op.ne]: req.session.aid,
                    }
                }
            }); 
            const apps_count = await App.count({
                where:{
                    deleted_at:null
                }
            }); 

            res.render('dashboard',{
                title: 'dashboard',
                user_count:user_count,
                apps_count:apps_count,
                
            });

        }
        else{
            res.redirect('/login');
        }
           
    },
    view_login: (req,res ) => {

    	if(!req.session.aid){

	    	res.render('login',{
	    		message:''
	    	});

    	}
    	else{
    		res.redirect('/dashboard');
    	}
    },  
    login : (req,res) => {

        try{
            let message;
           
            User.findOne({
                where:{
                    email:req.body.username,
                    user_type:1
                }
            }).then(async function(admin){

                if(admin != null){
                    
                    const match = await bcrypt.compare(req.body.password, admin.password);
                    if(!match) { 

                        res.render('login',{        
                            message:"Invalid Credentials"
                        })
                    }
                    else{
    
                        res.session = req.session;
                        res.session.aid = admin.id;                        
                        res.redirect('/dashboard');
                    }
                }
                else{
                    res.render('login',{        
                        message:"Invalid Credentials"
                    })
                } 
            })
        } catch (e) {
            console.log(e);
          }
        
    },
    logout: (req,res)=> {

        try{

            req.session.destroy();
            res.redirect('login')

        }
        catch(e)
        {
            console.log(e);
        }
    } ,
    change_password:(req,res) => {

        if(req.session.aid){
            res.render('change_password',{
                title:'',
                aid:req.session.aid,
                message:''
            })
        }
        else{
            res.redirect('/login');
        }
    },
    update_password : (req,res ) =>{
      
        const message = '';
       
        User.findOne({
            where:{
                id:req.session.aid,
                user_type:1
            },
        }).then(async function(admin){
            const match = await bcrypt.compare(req.body.current_password, admin.password);
            if(!match){
               
                res.render('change_password',{
                    message:'Current Password is not correct!',
                    title:''
                })
            }
            else{
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    admin.password = hash;
                    // users.info = req.body.password;
                    admin.save().then(() => {   
                        req.flash('info','Password Changed!')    
                        res.render('change_password',{
                            message:'',
                            title:'',
                            
                        })
                    })      
                    
                });

            }
        })
    }, 
}

