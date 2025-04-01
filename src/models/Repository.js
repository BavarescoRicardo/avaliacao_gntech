const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Repository = sequelize.define('repository', {
  github_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  language: {
    type: DataTypes.STRING,
  },
  stars: {
    type: DataTypes.INTEGER,
  },
  forks: {
    type: DataTypes.INTEGER,
  },
  last_updated: {
    type: DataTypes.DATE,
  },
  url: {
    type: DataTypes.STRING,
  },
});

module.exports = Repository;