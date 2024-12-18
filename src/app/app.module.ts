import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { BrandComponent } from './pages/admin/brand/brand.component';
import { TableComponent } from './shared/table/table.component';
import { HttpClientModule } from '@angular/common/http';

import { HttpUtilService } from './services/http-util.service';
import { TokenStorageService } from './services/token-storage.service';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './pages/admin/category/category.component';
import { CouponComponent } from './pages/admin/coupon/coupon.component';
import { ProductComponent } from './pages/admin/product/product.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    HomeComponent,
    BrandComponent,
    TableComponent,
    CategoryComponent,
    CouponComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpUtilService,
    TokenStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
