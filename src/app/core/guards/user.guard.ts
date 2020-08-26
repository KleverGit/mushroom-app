import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../redux/app.state';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {

    constructor(private store: Store<AppState>) {
    }

    /**
     * guard, to give permisions
     * @param route rute
     * @param state state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // can develop any logic
        return true;
    }
}
