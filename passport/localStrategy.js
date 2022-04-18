const db = require('../models');
const User = db.users;
const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const strategy = new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	async function(email, password, done) {
		try {
			const getuser = await User.findOne(
				{ 
					where: {
						email: email,
						password: password
					},
					attributes:{
						include:[
							[Sequelize.literal(`IFNULL( (SELECT name FROM person WHERE user_id = user.id),'')`),"name"],
                    		[Sequelize.literal(`IFNULL( (SELECT surname FROM person WHERE user_id = user.id),'')`),"surname"],
							[Sequelize.literal(`CASE role WHEN 5 THEN id ELSE parentId	 END`), 'parentId'],
						]
					}
				});

				console.log('local 1');
				if (!getuser) {
					return done(null, false, { message: 'Incorrect username or password' });
				}

				
				return done(null, getuser.dataValues);
		} catch (e) {
			console.log('local');
			return done(e);
		}
	}
)

module.exports = strategy
