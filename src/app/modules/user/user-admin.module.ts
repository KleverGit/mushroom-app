
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { storeFreeze } from 'ngrx-store-freeze';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { AppCoreModule } from '../../core/app.core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserEffects } from './redux/effects/user.effect';
import { UserAdminComponent } from './user-admin.component';
import { userRoutes } from './user-admin.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list/user-list.component';
import { userReducers, UserState } from './redux/states/user.state.root';
import { environment } from 'src/environments/environment';
import { AppCommonModule } from 'src/app/commons/app.common.module';

export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [storeFreeze] : [];
@NgModule({
    declarations: [
        UserAdminComponent,
        UserListComponent,
    ],
    imports: [
        CommonModule,
        AppCommonModule,
        AppCoreModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        userRoutes,
        StoreModule.forFeature('user', userReducers, { metaReducers }),
        EffectsModule.forFeature([UserEffects]),

    ],
    exports: [
    ],
    entryComponents: [
        // UserCreateModalComponent
    ]
})
export class UserModule {
}
