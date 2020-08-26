import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { AppState } from 'src/app/core/redux/app.state';

@Component({
  selector: 'user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent {

  constructor(private store: Store<AppState>,
  ) { }

}
