import { faker } from '@faker-js/faker';
import { User } from './user.model';

export const generateOneProduct = (): User => {
  return {
    id: faker.datatype.uuid().toString(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    active: faker.datatype.boolean(),
    createdAt: faker.datatype.datetime().toString(),
    updatedAt: faker.datatype.datetime().toString(),
  };
};

export const generateManyProducts = (size = 10): User[] => {
  const users: User[] = [];
  for (let index = 0; index < size; index++) {
    users.push(generateOneProduct());
  }
  return [...users];
};
