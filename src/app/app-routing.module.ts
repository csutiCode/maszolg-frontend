import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { SearchComponent } from './components/search/search.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  {path: 'list', component: ListComponent},
  {path: 'login', component: LoginComponent} ,
  {path: 'reg', component: RegComponent},
  {path: 'account/update', component: UpdateFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account', component: AccountDetailsComponent},
  {path: 'loggedIn', component: LoggedInComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'data-protection', component: DataProtectionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
