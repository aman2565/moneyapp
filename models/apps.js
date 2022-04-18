/* jshint indent: 1 */
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apps', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		
		  name: {
			type: DataTypes.STRING(255),
			allowNull: false
		  },
		  app_link: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '',
			field:"app_link"
		  },
		  description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "", 
		  },
		  amount: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: "0", 
		  },
		  rewards_amount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: ""
		  },
		  rewards_description: {
			type: DataTypes.STRING(255),
			allowNull: false, 
            defaultValue:"",
            field:"rewards_description"
		  },
		  additional_amount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			field: "additional_amount"
		  },
		  additional_description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: "additional_description"
		  },
		  
		  status: {
			type: DataTypes.ENUM('0','1'),
			allowNull: true,
			defaultValue: "1",
			comment: "0=>inactive 1=>active"
		  },		   
		  deleted_at: {
			type: DataTypes.DATE,
			allowNull: true,  
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
		tableName: 'apps'
	});
};
