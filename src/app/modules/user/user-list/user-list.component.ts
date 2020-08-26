import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromUserSelector from '../redux/selectors/user.selector';
import { UserModel } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/redux/app.state';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModalComponent } from '../user-modal/user.modal.component';
import { Subscription } from 'rxjs';
import { UserFactory } from 'src/app/core/factories';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public bsModalRef: BsModalRef;
    public users: UserModel[];
    public subscription = new Subscription();

    constructor(private store: Store<AppState>,
        private modalService: BsModalService,
        private userFactory: UserFactory) {
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

    /**
     * open modal save new user update user
     * @param user user model
     */
    openModalUser(user?: UserModel) {
        const initialState = {
            user: user,
        };
        const config = {
            initialState,
            ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(UserModalComponent, config);

    }

}
