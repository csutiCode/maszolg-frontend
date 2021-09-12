import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountComponent } from './components/account/account.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: 'about', component: AboutComponent }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
