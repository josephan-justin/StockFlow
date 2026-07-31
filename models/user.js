'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    checkPassword(password){
      return bcrypt.compareSync(password, this.password)
    }

    static findByEmail(email){
      return User.findOne({
        where:{email}
      })
    }

    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Name required!'
        },
        notEmpty:{
          msg: 'Name required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
          msg: 'Email already registered!'
        },
      validate:{
        notNull: {
          msg: 'Email required!'
        },
        notEmpty:{
          msg: 'Email required!'
        },
        isEmail: {
          msg: 'Invalid Email Format!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Password required!'
        },
        notEmpty:{
          msg: 'Password required!'
        },
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters!'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Role required!'
        },
        notEmpty:{
          msg: 'Role required!'
        },
        isIn: {
          args: [['staff', 'admin']],
          msg: 'Invalid Role!'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user){
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  return User;
};