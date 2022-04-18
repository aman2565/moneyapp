const routes  = require('express').Router();

var AdminController = require("../controllers/AdminController"); 
var UserController = require("../controllers/UserController"); 
var AppControllers = require("../controllers/AppController"); 

routes.get('/',function(res ,req){
	req.redirect('/dashboard');
});

	routes.get('/login',AdminController.view_login); 
	routes.post('/login',AdminController.login); 
	routes.get('/dashboard',AdminController.dashboard);
	routes.get('/logout',AdminController.logout);
	routes.get('/change_password',AdminController.change_password);
	routes.post('/change_password',AdminController.update_password);
/*******************************Users*************************************/
	routes.get('/users',UserController.index);
	routes.get('/users/:id',UserController.show);	
	routes.get('/user/create',UserController.create);
	routes.get('/app_listing',AppControllers.index);	
	routes.get('/app/:id',AppControllers.show_apps);
	routes.get('/applist/app-created',AppControllers.add_created);	
	routes.post('/applist/store',AppControllers.store_apps_data);	
	routes.get('/app/edit/:id',AppControllers.edit);
	routes.get('/app/delete/:id',AppControllers.destroy);
	routes.post('/applist/update',AppControllers.update);


module.exports = routes;