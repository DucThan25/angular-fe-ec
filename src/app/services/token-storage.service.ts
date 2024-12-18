import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from "rxjs";

export enum StorageKey {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  USER_ROLES = 'userRoles',
  USER_NAME = 'name',
}

@Injectable()
export class TokenStorageService {
  notifyChange: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public getAccessToken(): Observable<string> {
    const token: string = localStorage.getItem(StorageKey.ACCESS_TOKEN) as string;
    return of(token);
  }

  public getTokenStr(): string {
    return <string>localStorage.getItem(StorageKey.ACCESS_TOKEN);
  }

  public getRefreshToken(): Observable<string> {
    const token: string = localStorage.getItem('refreshToken') as string;
    return of(token);
  }


  public setAccessToken(token: string): TokenStorageService {
    localStorage.setItem(StorageKey.ACCESS_TOKEN, token);
    return this;
  }

  public setUsername(name: string): TokenStorageService {
    localStorage.setItem(StorageKey.USER_NAME, name);
    return this;
  }
  public getUsername(): string {
    const userName: any = localStorage.getItem(StorageKey.USER_NAME);
    return userName;
  }

  public setRefreshToken(token: string): TokenStorageService {
    localStorage.setItem('refreshToken', token);
    return this;
  }



  public setUserRoles(roles: string[]): any {
    if (roles != undefined && roles.length > 0) {
      localStorage.setItem(StorageKey.USER_ROLES, roles.join("|"));
    }
    return this;
  }

  public getUserRole(): string {
    return <string>localStorage.getItem(StorageKey.USER_ROLES);
  }


  public removeItem(key: string): Observable<void> {
    return of(localStorage.removeItem(key));
  }

  public clear(): Observable<any> {
    const deleteKeys = [StorageKey.ACCESS_TOKEN, StorageKey.USER_ROLES];
    const taskRemove$: any[] = [];
    deleteKeys.forEach(key => {
      taskRemove$.push(this.removeItem(key));
    });
    return forkJoin(taskRemove$);
  }
}

export class TokenStorage {
}
