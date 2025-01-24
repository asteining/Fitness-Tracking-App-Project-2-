import { Food } from '../models/index.js';

export const seedFoods = async () => {
  await Food.bulkCreate(
    [
      { fdcid: 1662353, 
        Nutrients: 1008, },
      {
        fdcid: 1662353, 
        Nutrients: 1008
      },
      {
        fdcid: 1662353, 
        Nutrients: 1008
      },
    ],
    { individualHooks: true }
  );
};
