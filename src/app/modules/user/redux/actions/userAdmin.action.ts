import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const SET_USER_LIST = '[SET_USER_LIST] Set list of users';

export class SetUserListAction implements Action {
    readonly type = SET_USER_LIST;
    constructor(public users: UserModel[]) {
    }
}

export type userActions = SetUserListAction;

