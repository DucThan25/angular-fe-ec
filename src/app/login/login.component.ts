import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public error = '';
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private tokenStorage: TokenStorageService,
    private _authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      var params = { username: this.loginForm.value.username, password: this.loginForm.value.password };
      this._authenticationService
        .login(params)
        .pipe(first())
        .subscribe(
          (data: { code: number; result: any; }) => {
            if(data.code == 200){
              if (this.tokenStorage.getUserRole() == 'USER') {
              this._router.navigate(['/dashboard'])
                .then(() => {
                  window.location.reload();
                });
              } else {
                this._router.navigate(['/admin'])
                  .then(() => {
                    window.location.reload();
                  });
              }
            } else {
              this.error = data.result.message;
            }
            console.log("DATA ==> ", data);
          },
          (error: string) => {
            if(error==='Unauthorized'){
              this.error = "Tên đăng nhập hoặc mật khẩu không đúng!";
            }else if(error === 'OK'){
              this.error = "Tên đăng nhập hoặc mật khẩu không đúng!";
            }else{
              this.error = "Không kết nối được tới hệ thống!";
            }
          },
        );
    } else {
      alert('Invalid form. Please check your inputs.');
    }
  }
}
