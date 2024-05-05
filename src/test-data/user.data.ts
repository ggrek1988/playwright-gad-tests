import { LoginUserModal } from '../models/user.model';

export const testUser1: LoginUserModal = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.UESER_PASSWORD ?? '[NOT SET]',
};
