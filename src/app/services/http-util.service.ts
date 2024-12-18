import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {DatePipe} from "@angular/common";
import {TokenStorageService} from "./token-storage.service";
import {ApiContext} from "./api-context";

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService extends ApiContext {

  constructor(
    public http: HttpClient, private tokenStorage: TokenStorageService) {
    super();
  }

  public handleError(error: any) {
    return throwError(error);
  }

  public callAPI(url: string, data: any, responseType?: any): Observable<any> {
    let method: any;
    if (data.method) {
      method = data.method;
      delete data.method;
    }
    if (responseType == null)
      responseType = 'json';
    else
      responseType = 'blob';

    data.responseType = responseType;

    let headers: any;
    // truyen authorization len phuong thuc get
    if (data && data.authorizationParams) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + data.authorizationParams });
      headers.append('Content-Type', 'application/json; charset=utf-8');

    } else if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');

    }
    const requestParam = Object.assign({}, data);
    const fullDate = new Date();
    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(fullDate, 'dd/MM/yyyy');
    let signature = '';
    const param = Object.keys(requestParam);
    for (let i = 0; i < param.length; i++) {
      if (requestParam[param[i]] || requestParam[param[i]] === 0) {
        signature = signature + requestParam[param[i]];
      }
    }
    signature = signature + 'web' + 'EJVsEmpnoqStUZbTSnEwdCpZsoGgIm' + currentDate;
    let params = {};
    let body = {};
    if (method === 'GET') {
      params = requestParam;
    } else {
      body = requestParam.content;
    }
    const ops = {
      body,
      headers,
      params,
      responseType
    };
    return this.http.request(method, url, ops).pipe(catchError(this.handleError));
  }
}
