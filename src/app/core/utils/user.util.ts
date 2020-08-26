import * as _ from 'lodash';
import { UserModel } from '../models/user.model';
import { FormGroup } from '@angular/forms';


export abstract class UserUtil {

    /**
     * build User model
     */
    public static buildUserModel(formUser: FormGroup): UserModel {
        const user = new UserModel();
        user.email = formUser.value.email;
        user.gender = formUser.value.gender;
        user.name = formUser.value.name;
        user.password = formUser.value.password;
        user.role = formUser.value.role;
        user.status = true;
        return user;
    }
}

