import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as fromUserAction from '../actions/userAdmin.action';
import { UserFactory } from 'src/app/core/factories';
import { AppState } from 'src/app/core/redux/app.state';

@Injectable()
export class UserEffects {

    constructor(private store: Store<AppState>,
        private actions$: Actions,
        private userFactory: UserFactory,
    ) {
    }

    /**
     * Effecto qupe consulta al servicio web la lista de Useres mediante los filtros ingresados
     */
    @Effect({ dispatch: true })
    getUserList$: Observable<Action> = this.actions$.pipe(
        ofType<fromUserAction.SetUserListAction>(fromUserAction.SET_USER_LIST),
        withLatestFrom(this.store),
        mergeMap(([action, store]) => {
            return this.userFactory.getAllUsers().pipe(
                map(data => {
                    if (!_.isNil(data) && !_.isEmpty(data)) {
                        return new fromUserAction.SetUserListAction(data);
                    } else {
                        return new fromUserAction.SetUserListAction([]);
                    }
                })
            );
        }),
        catchError(error => {
            return of(error);
        })
    );



}
