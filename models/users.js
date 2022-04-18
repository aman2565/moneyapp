/* jshint indent: 1 */
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		user_type: {
			type: DataTypes.INTEGER,
			allowNull: true
		  },
		  name: {
			type: DataTypes.STRING(255),
			allowNull: false
		  },
		  social_type: {
			type: DataTypes.ENUM('0','1','2','3'),
			allowNull: false,
			defaultValue: "0",
			comment: "0->email,1->apple 2->facebook 3->google+"
		  },
		  social_user_status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: true,
			defaultValue: "0",
			comment: "0->new 1->old"
		  },
		  social_id: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		  },
		  email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "users_email_unique"
		  },
		  mac_address: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: "mac_address"
		  },
		  email_verified_at: {
			type: DataTypes.DATE,
			allowNull: true
		  },
		  password: {
			type: DataTypes.STRING(255),
			allowNull: false
		  },
		  country_code: {
			type: DataTypes.STRING(11),
			allowNull: true
		  },
		  phone_number: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: 0,
			field:'phone_number' 
		  },
		  profile_pic: {
			type: DataTypes.STRING(255),
			allowNull: true
		  },
		  location: {
			type: DataTypes.STRING(255),
			allowNull: true
		  },
		  otp_verified: {
			type: DataTypes.ENUM('0','1'),
			allowNull: true,
			defaultValue: "0",
			comment: "0->no 1->yes"
		  },
		  lat: {
			type: DataTypes.TEXT,
			allowNull: true
		  },
		  lng: {
			type: DataTypes.TEXT,
			allowNull: true
		  },
		  status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: true,
			defaultValue: "1",
			comment: "0=>inactive 1=>active"
		  },
		  complete_profile_status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: false,
			defaultValue: "0",
			comment: "0->new 1->old"
		  },
		  social_profile_complete_status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: false,
			defaultValue: "0",
			comment: "0->new 1->old"
		  }, 
		  device_type: {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "1->IOS 2->Andriod"
		  },
		 
		  device_token: {
			type: DataTypes.TEXT,
			allowNull: true
		  },
		  remember_token: {
			type: DataTypes.STRING(100),
			allowNull: true
		  },
		  password_token: {
			type: DataTypes.TEXT,
			allowNull: true
		  },
		  createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
	}, {
		tableName: 'users'
	});
};
