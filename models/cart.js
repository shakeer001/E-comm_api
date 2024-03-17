'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey:{
          name:'userId',
          allowNull:false
        }
      })
      this.belongsToMany(models.Product,{
        through:models.cart_products,
        foreignKey:'cartId',
        otherKey:'productId'
      })
    }
  }
  Cart.init({
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'creation'
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};