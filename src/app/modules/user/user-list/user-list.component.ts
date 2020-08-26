import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromUserSelector from '../redux/selectors/user.selector';
import { UserModel } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/redux/app.state';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModalComponent } from '../user-modal/user.modal.component';
import { Subscription, Subject } from 'rxjs';
import { UserFactory } from 'src/app/core/factories';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { GenericObjectFilterPipe } from 'src/app/core/pipes/genericObjectFilter.pipe';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public bsModalRef: BsModalRef;
    public users: UserModel[];
    public usersFiltered: UserModel[];
    public subscription = new Subscription();
    private customSearch = new Subject<string>();
    public searchText: string;
    public genericFilter: GenericObjectFilterPipe;

    constructor(private store: Store<AppState>,
        private modalService: BsModalService,
        private userFactory: UserFactory) {

        this.customSearch.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
            let searchText = '';
            if (this.searchText && this.searchText.length > 2) {
                searchText = this.searchText;
            }
            this.usersFiltered = this.genericFilter.transform(this.users, searchText);
        });
    }

    ngOnInit() {
        this.store.select(fromUserSelector.selectUserList).subscribe(users => {
            if (!_.isNil(users) && !_.isEmpty(users) && !_.isEmpty(users)) {
                this.users = users;
                this.usersFiltered = users;

            } else {
                this.users = [];
            }
        });

        this.genericFilter = new GenericObjectFilterPipe();
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

    /**
    * Metodo que permite firltrar la lista por cualquier valor del objeto
    */
    filterList() {
        this.customSearch.next(this.searchText);
    }

}
