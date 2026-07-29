'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    
    get formattedDate() {
      return new Date(this.date).toLocaleDateString("id-ID")
    }

    static associate(models) {
      Transaction.belongsTo(models.User)
      Transaction.hasMany(models.TransactionDetail)
    }
  }
  Transaction.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};