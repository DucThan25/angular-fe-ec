import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpUtilService} from "./http-util.service";
import { jwtDecode }from 'jwt-decode';
import {TokenStorageService} from "./token-storage.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly BASE_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.auth;

  constructor(private _http: HttpClient, private httpUtilService: HttpUtilService, private tokenStorage: TokenStorageService) { }

  login(params: { username: string; password: string }) {
    return this._http
      .post<any>(`${this.BASE_URL}/token`, params)
      .pipe(
        map(user => {
          let userx = user;
          if (user.code == 200 || user.code == '200') {
            if (user.result['token']) {
              var token = user.result['token'];
              var decode = jwtDecode(token);
              this.saveAccessData(decode, token);
            }
          }
          return userx;
        })
      );
  }

  private saveAccessData(accessData: any, token: string) {
    if (accessData) {
      var _token = token;
      const scopeArr = accessData.scope.split(' ');
      var _role: string[] = scopeArr
        .filter((item: string) => item.startsWith('ROLE_'))
        .map((item: string) => item.split('ROLE_')[1]);

      this.tokenStorage
        .setAccessToken(_token)
        .setUserRoles(_role)
        .setUsername(accessData.sub)
    }
  }

  logout() {
    this.tokenStorage.removeItem('accessToken');
    this.tokenStorage.removeItem('userRoles');
    this.tokenStorage.removeItem('name');
  }

}
