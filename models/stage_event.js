'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StageEvent.init({
    stage_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  name: {
      type: DataTypes.STRING(255),
      allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  stage_id: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  event_id: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
  }, {
    sequelize,
    modelName: 'StageEvent',
    tableName: 'stage_event',
    timestamps: false
  });
  return StageEvent;
};
