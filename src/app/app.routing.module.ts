import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './commons/components/error/error.component';

const routes: Routes = [
    { path: '**', component: ErrorComponent }
];

export const appRoutes = RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' });
