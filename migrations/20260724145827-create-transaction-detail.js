'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      TransactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Transactions',
          key: 'id'
         },
         onUpdate: 'cascade',
         onDelete: 'cascade'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Products',
          key: 'id'
         },
         onUpdate: 'cascade',
         onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionDetails');
  }
};