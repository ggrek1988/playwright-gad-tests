import { RegisterUserModal } from '@_src/models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUser(): RegisterUserModal {
  // zmienna bazująca na interfejsie w user.model.ts
  const registerUserData: RegisterUserModal = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    userPassword: faker.internet.password(),
  };

  registerUserData.userEmail = faker.internet.email({
    firstName: registerUserData.userFirstName,
    lastName: registerUserData.userLastName,
  });

  return registerUserData;
}
