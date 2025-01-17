import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db';

class User extends Model {}
User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'User' }
);

export default User;