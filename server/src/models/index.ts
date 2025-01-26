import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { ExerciseFactory } from './exerciseLog.js';
import { FoodFactory } from './foodlog.js';

const User = UserFactory(sequelize);
const Exercise = ExerciseFactory(sequelize);
const Food = FoodFactory(sequelize);


export { User };
export { Exercise };
export { Food };
