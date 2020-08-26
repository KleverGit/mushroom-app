import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromUserSelector from '../redux/selectors/user.selector';
import { UserModel } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/redux/app.state';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public bsModalRef: BsModalRef;
    public users: UserModel[];

    constructor(private store: Store<AppState>,
        private modalService: BsModalService) {
    }

    ngOnInit() {
        this.store.select(fromUserSelector.selectUserList).subscribe(users => {
            if (!_.isNil(users) && !_.isEmpty(users) && !_.isEmpty(users)) {
                this.users = users
            } else {
                this.users = [];
            }
        });
    }

}
