const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Descomente para ver os logs do Sequelize (em desenvolvimento)
  }
);

module.exports = {
  sequelize,
  Sequelize,
};