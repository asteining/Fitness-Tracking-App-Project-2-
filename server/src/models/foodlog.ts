import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface FoodAttributes {
  fdcid: number; // Food Data Central ID
  Nutrients: number; // Calories value
}

interface FoodCreationAttributes extends Optional<FoodAttributes, 'fdcid'> {}

export class Food
  extends Model<FoodAttributes, FoodCreationAttributes>
  implements FoodAttributes
{
  public fdcid!: number; // FDC ID (Primary Key)
  public Nutrients!: number; // Calories value

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function FoodFactory(sequelize: Sequelize): typeof Food {
  Food.init(
    {
      fdcid: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark as primary key
        allowNull: false,
      },
      Nutrients: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'foods',
      sequelize,
    }
  );

  return Food;
}
