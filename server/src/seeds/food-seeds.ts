import { Food } from '../models/index.js';

export const seedFoods = async () => {
  await Food.bulkCreate(
    [
      { fdcid: 1662353, // chicken 
        Nutrients: 208, }, // calories
      {
        fdcid: 168727, // steak
        Nutrients: 208, // calories
      },
      {
        fdcid: 167827, //pork
        Nutrients: 208, // calories
      },
    ],
    { individualHooks: true }
  );
};
