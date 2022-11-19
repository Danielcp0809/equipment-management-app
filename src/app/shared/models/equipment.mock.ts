import { faker } from '@faker-js/faker';
import { Equipment } from './equipment.model';

export const generateOneEquipment = (): Equipment => {
  return {
    id: faker.datatype.uuid().toString(),
    brand: faker.vehicle.manufacturer(),
    serial: faker.vehicle.vin(),
    model: faker.vehicle.model(),
    active: faker.datatype.boolean(),
    createdAt: faker.datatype.datetime().toString(),
    updatedAt: faker.datatype.datetime().toString(),
  };
};

export const generateManyEquipment = (size = 10): Equipment[] => {
  const users: Equipment[] = [];
  for (let index = 0; index < size; index++) {
    users.push(generateOneEquipment());
  }
  return [...users];
};