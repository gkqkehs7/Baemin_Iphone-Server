"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Stores", "category", Sequelize.INTEGER);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
