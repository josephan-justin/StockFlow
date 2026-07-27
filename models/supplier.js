'use strict';
const {
  Model,
  STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.hasMany(models.Product)
    }
  }
  Supplier.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Name Required!'
        },
        notEmpty:{
          msg: 'Name Required!'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Phone Number Required!'
        },
        notEmpty:{
          msg: 'Phone Number Required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Email Required!'
        },
        notEmpty:{
          msg: 'Email Required!'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Address Required!'
        },
        notEmpty:{
          msg: 'Address Required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};