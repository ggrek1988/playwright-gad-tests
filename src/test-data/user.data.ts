import { USERS_PASSWORD, USER_EMAIL } from '../env.config';
import { LoginUserModal } from '../models/user.model';

export const testUser1: LoginUserModal = {
  userEmail: USER_EMAIL,
  userPassword: USERS_PASSWORD,
};
