import {Injectable} from "@angular/core";
import {HttpUtilService} from "../../../services/http-util.service";


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly API_URL = this.httpUtilService.BASE_URL
  constructor( private httpUtilService: HttpUtilService) {
  }

  public async getAllBrand( params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + this.httpUtilService.api.api + `/brands/is-active`,params).toPromise();
  }
}
