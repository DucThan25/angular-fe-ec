import {Injectable} from "@angular/core";
import {HttpUtilService} from "./http-util.service";


@Injectable({providedIn: 'root'})
export class DashboardService {
  private readonly API_URL = this.httpUtilService.BASE_URL
  constructor( private httpUtilService: HttpUtilService) {
  }

  public async getAllUser( params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + this.httpUtilService.api.api + `/users`,params).toPromise();
  }

  public async logoutUser( params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + this.httpUtilService.api.auth +`/logout`,params).toPromise();
  }
}
