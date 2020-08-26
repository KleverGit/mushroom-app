import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HTTP_SERVICES } from '../../commons/http-services/http-constant.services';

@Injectable()
export class UserService extends BaseService {

    protected proxiService: any;

    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = environment.LOCAL_SERVER;
        this.proxiService = HTTP_SERVICES;
    }

    /**
     * Get all usera
     */
    getAllUsers(): Observable<UserModel[]> {
        return this.getWithoutBaseUrl(`${environment.USER_SERVER}${this.proxiService.GET_ALL_USERS}`);
    }

    /**
     * Save new user
     * @param user body request
     */
    saveUser(user: UserModel): Observable<any> {
        return this.post(`${this.proxiService.SAVE_USER}`, user);
    }

}
