import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/core/redux/app.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserModel } from 'src/app/core/models/user.model';
import { UserUtil } from 'src/app/core/utils/user.util';
import { UserFactory } from 'src/app/core/factories';

@Component({
  selector: 'user-modal',
  templateUrl: './user.modal.component.html',
  styleUrls: ['./user.modal.component.scss']
})
export class UserModalComponent implements OnInit {

  public formUser: FormGroup;
  @Output() userData: EventEmitter<UserModel> = new EventEmitter();
  public user: UserModel;

  constructor(private store: Store<AppState>,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userFactory: UserFactory
  ) { }

  ngOnInit() {
    this.initFormUser();
  }

  /**
   * Init form user
   */
  initFormUser() {
    this.formUser = this.formBuilder.group({
      name: [null, []],
      email: [null, []],
      gender: [null, []],
      password: [null, []],
      role: [null, []],
    });
  }

  /**
   * Save user
   */
  saveUser() {
    const userModel = UserUtil.buildUserModel(this.formUser);
    this.userFactory.saveUser(userModel).subscribe(resp2 => {
      console.log('succes save user', resp2);
    }, err => {
      console.log('error save user', err);
    });

  }

}
