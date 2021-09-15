import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { RegComponent } from './components/reg/reg.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  {path: 'list', component: ListComponent},
  {path: 'login', component: LoginComponent} ,
  {path: 'reg', component: RegComponent},
  {path: 'reg/form', component: RegFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account', component: AccountDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
