import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { ExerciseFactory } from './exerciselog.js';

const User = UserFactory(sequelize);
const Exercise = ExerciseFactory(sequelize);

export { User };
export { Exercise };
