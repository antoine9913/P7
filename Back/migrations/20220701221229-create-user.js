"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			avatar: {
				allowNull: true,
				type: Sequelize.STRING,
				defaultValue: 'http://localhost:5000/images/avatar.png',
			},
			bio: {
				allowNull: true,
				type: Sequelize.TEXT,
			},
			isAdmin: {
				allowNull: false,
				defaultValue: false,
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};