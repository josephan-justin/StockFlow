'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.TransactionDetail)
      Product.belongsTo(models.Category)
      Product.belongsTo(models.Supplier)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Product Name Required!'
        },
        notEmpty:{
          msg: 'Product Name Required!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Price Required!'
        },
        notEmpty:{
          msg: 'Price Required!'
        }
      }
    },
    stock: DataTypes.INTEGER,
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Image Required!'
        },
        notEmpty:{
          msg: 'Image Required!'
        }
      }
    },
    CategoryId: DataTypes.INTEGER,
    SupplierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};