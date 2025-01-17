import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db';

class Log extends Model {}
Log.init(
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    exerciseCalories: { type: DataTypes.FLOAT, allowNull: false },
    foodCalories: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: 'Log' }
);

export default Log;