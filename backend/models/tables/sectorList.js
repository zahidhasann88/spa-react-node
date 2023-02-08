const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../utils/db-connection");

class SectorList extends Model { }
SectorList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: DataTypes.STRING,
}, { sequelize, tableName: 'sectorlist', freezeTableName: true });

SectorList.sync({
  force: false
});

module.exports = SectorList;