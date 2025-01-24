import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface FoodAttributes {
  id: number;
  Servings: number;
  Calories: number;
}

interface FoodCreationAttributes extends Optional<FoodAttributes, 'id'> {}

export class Food
  extends Model<FoodAttributes, FoodCreationAttributes>
  implements FoodAttributes
{
  public id!: number;
  public Servings!: number;
  public Calories!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

export function FoodFactory(sequelize: Sequelize): typeof Food {
  Food.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    
      },
    },
    {
      tableName: 'foods',
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

  return Food;
}
