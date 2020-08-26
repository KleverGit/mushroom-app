import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UserFactory {

    constructor(private userService: UserService) {
    }

    /**
     * Get all usera
     */
    getAllUsers(): Observable<UserModel[]> {
        return this.userService.getAllUsers();
    }


}
