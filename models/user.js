'use strict';
const {
  Model
} = require('sequelize');

const bcrypt=require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{
        through:'User_Roles',
        foreignKey:'userId',
        otherKey:'roleId'
      })
      this.hasMany(models.Cart,{
        foreignKey:{
          name:'userId',
          allowNull:false
        }
      })
    }
  }
  User.init({
    email:{
      type : DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password:{
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{min:4}
      }
    },
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  },);

  User.beforeCreate(async(user)=>{
    const encryptedPassword=bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS))
    user.password=encryptedPassword;
  })

  return User;
};