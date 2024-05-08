import { USERS_PASSWORD, USER_EMAIL } from '@_config/env.config';
import { LoginUserModal } from '@_src/models/user.model';

export const testUser1: LoginUserModal = {
  userEmail: USER_EMAIL,
  userPassword: USERS_PASSWORD,
};
