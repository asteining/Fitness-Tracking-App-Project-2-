import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface ExerciseAttributes {
  activity: string;
  duration: number;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, 'activity'> {}

export class Exercise
  extends Model<ExerciseAttributes, ExerciseCreationAttributes>
  implements ExerciseAttributes
{
  public activity!: string;
  public duration!: number;

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
      duration: {
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
