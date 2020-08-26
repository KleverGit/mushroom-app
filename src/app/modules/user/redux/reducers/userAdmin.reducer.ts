// Padticipant Admin
import * as _ from 'lodash';
import * as fromUserState from '../states/userAdmin.state';
import * as fromUserAction from '../actions/userAdmin.action';

/**
 * Reducer User
 * @param state old state
 * @param action action type
 */
export function userReducer(state: fromUserState.UserAdminState = fromUserState.initUserState,
    action: fromUserAction.userActions): fromUserState.UserAdminState {
    switch (action.type) {
        case fromUserAction.SET_USER_LIST:
            return {
                userList: action.users
            };
        default:
            return state;
    }
}
