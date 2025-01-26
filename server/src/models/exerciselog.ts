import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface ExerciseAttributes {
  id: number;
  exerciseType: string;
  hoursPerformed: number;
  caloriesBurned: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, 'activity'> {}

export class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public id!: number;
  public exerciseType!: string;
  public hoursPerformed!: number;
  public caloriesBurned!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export function ExerciseFactory(sequelize: Sequelize): typeof Exercise {
  Exercise.init(
    {
      activity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hoursPerformed: {
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
