const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users; 
const App = db.apps; 
const Sequelize = require('sequelize');
const moment = require('moment');

const Op = Sequelize.Op; 

module.exports = {


    index : (req ,res ) => {
        if(req.session.aid){
             
            App.findAll({
                where:{
                    deleted_at:null
                         
                },
                order: [
                    ['id', 'DESC'],
                ] 
            }).then(function(apps){

                
                res.render('apps/index',{
                    title: 'apps',
                    apps:apps,
                    flash:''
                });

            });
            
        }
        else{
            res.redirect('/login');
        }
           
    },
    
    show_apps: async (req,res ) => {
        
        if(req.session.aid){

            let app_details = await App.findOne({
                where:{
                    id:req.params.id
                }
            })
            res.render('apps/view',{ title:'apps', 'app_details':app_details})
            
        }
        else
        {
            res.redirect('/login');
        }   
    },
    add_created: (req,res) => {

        if(req.session.aid){
           let message = "";
            res.render('apps/create',{
                title:'Apps',
                message:''
                
            });
        }
        else{
            res.redirect('/login');
        }

    },
    edit: (req,res) => {

        if(req.session.aid){
            App.findOne({
                where:{
                    id:req.params.id
                }
            }).then(function(app_details){
                res.render('apps/edit',{
                    appdetails:app_details,
                    title:'apps',
                    message:''
                })
            })
        }
        else{
            res.redirect('/login');
        }

    },
    store_apps_data: async (req,res) => {

        if(req.session.aid){
            let createdApp = await App.create({
                name:req.body.name,
                app_link:req.body.app_link,
                description:req.body.description,
                amount:req.body.amount,
                rewards_amount:req.body.rewards_amount,
                rewards_description:req.body.rewards_description,
                additional_amount:req.body.additional_amount,
                additional_description:req.body.additional_description,
            });
            req.flash('info','App created successfully')    
            res.redirect('/app_listing');
        }
        else{
            res.redirect('/login');
        }

    },
    update: async(req,res) => {
        
        if(req.session.aid){

            await App.update({
                name:req.body.name,
                app_link:req.body.app_link,
                description:req.body.description,
                amount:req.body.amount,
                rewards_amount:req.body.rewards_amount,
                rewards_description:req.body.rewards_description,
                additional_amount:req.body.additional_amount,
                additional_description:req.body.additional_description,
            },{
                where:{
                    id: req.body.app_id
                }
            });
            req.flash('info','App Updated successfully')    
            res.redirect('/app_listing');           
        } 
        else
        {
            res.redirect('/login');
        } 
    },

    destroy : async (req,res ) =>{
        if(req.session.aid){ 
            
            await App.update({
                deleted_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            },{
                where:{
                    id: req.params.id
                }
            });
            req.flash('info','App Deleted successfully')    
            res.redirect('/app_listing');           
        } 
        else
        {
            res.redirect('/login');
        } 

    }
}

