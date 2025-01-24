import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface ExerciseAttributes {
  id: number;
  exerciseType: string;
  hoursPreformed: number;
  caloriesBurned: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, 'id'> {}

export class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public id!: number;
  public exerciseType!: string;
  public hoursPreformed!: number;
  public caloriesBurned!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export function ExerciseFactory(sequelize: Sequelize): typeof Exercise {
  Exercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exerciseType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hoursPreformed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      caloriesBurned: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'exercises',
      sequelize,
      // hooks: {
      //   beforeCreate: async (user: User) => {
      //     await user.setPassword(user.password);
      //   },
      //   beforeUpdate: async (user: User) => {
      //     await user.setPassword(user.password);
      //   },
      // },
    }
  );

  return Exercise;
}
