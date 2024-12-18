import {Component} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {DashboardService} from "../services/dashboard.service";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public token: any;
  constructor(
    private tokenStorage: TokenStorageService,
    private dashboardService: DashboardService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService) {
    this.token = this.tokenStorage.getTokenStr();
  }

  aaaaa() {
    const params = {
      method: "GET",
    };
    this.dashboardService.getAllUser(params)
      .then((res) => {
        console.log("RES => ", res);
      })
      .catch((err) => {
        console.log("ERR => ", err);
      });
  }

  logout() {
    let content = {
      token: this.token
    };
    const params = {
      method: "POST",
      content: content
    };
    this.dashboardService.logoutUser(params)
      .then((res) => {
        if (res.code == 200) {
          this._authenticationService.logout();
          this._router.navigate(['/']);
        }
      })
      .catch((err) => {
        console.log("ERR => ", err);
      });
  }
}
