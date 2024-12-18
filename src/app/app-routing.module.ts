import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BrandComponent} from "./pages/admin/brand/brand.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {HomeComponent} from "./pages/admin/home/home.component";
import {CategoryComponent} from "./pages/admin/category/category.component";
import {ProductComponent} from "./pages/admin/product/product.component";
import {CouponComponent} from "./pages/admin/coupon/coupon.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'brand',
        component: BrandComponent,
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'coupon',
        component: CouponComponent
      }
    ],
  },
  { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
