'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Products',[
          {
            name: "Iphone 13",
            description: "The brand new Iphone 13 by apple",
            cost: 100000,
            createdAt:new Date(),
            updatedAt:new Date(),
            categoryId: 1
          },{
              name: "Ipad air",
              description: "The brand new Ipad air by apple",
              cost: 50000,
              createdAt:new Date(),
              updatedAt:new Date(),
              categoryId: 1
          },
          {
              name: "Mac-Book pro",
              description: "The brand new Mac-Book pro",
              cost: 150000,
              createdAt:new Date(),
              updatedAt:new Date(),
              categoryId: 1
          }
      ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products',null,{})
  }
};
