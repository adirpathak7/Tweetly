"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const [rolesData] = await queryInterface.sequelize.query(
      `select roleId from roles where role = "admin"`
    );

    // console.log("admin role: ", rolesData[0].roleId);

    if (!rolesData || rolesData == null) {
      throw new Error("admin role is not exist!");
    }

    const hashPassword = await bcrypt.hash("admin@123", 10);

    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        email: "admin@gmail.com",
        gender: "male",
        dateOfBirth: "1990-01-01",
        password: hashPassword,
        roleId: rolesData[0].roleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
