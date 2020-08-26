import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin.component';
import { UserGuard } from 'src/app/core/guards/user.guard';
import { UserListComponent } from './user-list/user-list.component';

const routesUser: Routes = [
    {
        path: 'user', component: UserAdminComponent,
        canActivate: [UserGuard], // if its neccesary
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UserListComponent }
        ]
    }
];

export const userRoutes = RouterModule.forChild(routesUser);
