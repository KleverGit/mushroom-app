import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/redux/app.state';
import { UserFactory } from 'src/app/core/factories';
import * as fromUserAction from './redux/actions/userAdmin.action';

@Component({
  selector: 'user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  public subscription = new Subscription();

  constructor(private store: Store<AppState>,
    private userFactory: UserFactory,
  ) { }

  ngOnInit() {
    this.subscription.add(this.gettAllUsers());
  }

  /**
   * Get all user from PUBLIC URL
   */
  gettAllUsers() {
    return this.userFactory.getAllUsers().subscribe(resp => {
      if (!_.isNil(resp) && !_.isEmpty(resp)) {
        this.store.dispatch(new fromUserAction.SetUserListAction(resp['data']));
      }
    });
  }



}
