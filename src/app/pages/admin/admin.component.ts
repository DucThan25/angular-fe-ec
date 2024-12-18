import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isHidden = false;

  constructor(private router: Router) {}


  isActive(url: string): boolean {
    return this.router.url === url;
  }

  toggleClass() {
    this.isHidden = !this.isHidden;
  }
}
