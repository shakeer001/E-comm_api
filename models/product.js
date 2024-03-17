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
      // define association here
      this.belongsTo(models.category,{
        foreignKey:"categoryId"
      })
      this.belongsToMany(models.Cart,{
        through:models.cart_products,
        foreignKey:'productId',
        otherKey:'cartId'
      })
    }
  }
  Product.init({
    name:{
      type : DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};