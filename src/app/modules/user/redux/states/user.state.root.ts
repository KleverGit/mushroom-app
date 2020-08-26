import * as fromUserState from './userAdmin.state';
import * as fromUserReducer from '../reducers/userAdmin.reducer';

export const userReducers = {
    userAdm: fromUserReducer.userReducer,
};

export interface UserState {
    userAdm: fromUserState.UserAdminState;
}
