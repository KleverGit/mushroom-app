import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/redux/app.state';
import { UserState } from '../states/user.state.root';

/**
 * Selectors user
 * @param state 
 */
export const selectUser = (state: AppState) => state.user;

export const selectUserList = createSelector(
    selectUser,
    (state: UserState) => state.userAdm.userList
);
