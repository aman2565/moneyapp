const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users; 
const Sequelize = require('sequelize');

const Op = Sequelize.Op; 

module.exports = {
    create:async (req,res) => {

        if(req.session.aid){
           let message = "";
            res.render('users/create',{
                title:'users',
                message:''
                
            });
        }
        else{
            res.redirect('/login');
        }

    },

    index : (req ,res ) => {
        if(req.session.aid){

            User.findAll({
                where:{
                    id:{
                        [Op.ne]: req.session.aid,
                    },
                },
                order: [
                    ['id', 'DESC'],
                ],
            }).then(function(users){
                res.render('users/index',{
                    title: 'users',
                    users:users,
                    flash:''
                });

            });
            
        }
        else{
            res.redirect('/login');
        }
           
    },
    
    show: (req,res ) => {
        
        if(req.session.aid){

            User.findOne({
                where:{
                    id:req.params.id
                }                
            }).then(function(user){
                res.render('users/view',{
                title:'users',
                message:'',
                user: user
            });
            });
        }
        else
        {
            res.redirect('/login');
        }   
    }
}

