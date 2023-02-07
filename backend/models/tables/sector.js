const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class Sector extends Model { }
Sector.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: DataTypes.STRING,
  sector: DataTypes.STRING,
  terms: DataTypes.STRING,
}, { sequelize, tableName: 'sectors', freezeTableName: true });

Sector.sync({
  force: false
});

module.exports = Sector;