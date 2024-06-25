'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Purchases', 'addressId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAddresses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Purchases', 'addressId');
  },
};
