import { UserModel } from 'src/app/core/models/user.model';

export interface UserAdminState {
    userList: UserModel[];
}

// Initial state
export const initUserState: UserAdminState = {
    userList: []
};
