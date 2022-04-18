const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../models');
const User = db.user;
const opts = {};
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
	passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
		try {
			const getuser = await User.findOne(
				{
					where: {
						id: jwt_payload.id,
						email: jwt_payload.userName,
						deviceToken: jwt_payload.deviceToken,
						isBlocked: jwt_payload.isBlocked
					},
					attributes:{
						include:[
							[Sequelize.literal(`IFNULL( (SELECT name FROM person WHERE user_id = user.id),'')`),"name"],
                    		[Sequelize.literal(`IFNULL( (SELECT surname FROM person WHERE user_id = user.id),'')`),"surname"],
							[Sequelize.literal(`CASE role WHEN 5 THEN id ELSE parentId END`), 'parentId'],
						]
					}
				});

			if (getuser) {
				return done(null, getuser.dataValues);
			}
			
			return done(null, false);
		} catch (e) {
			console.log('not local');
			console.error(e);
		}
	}));
}