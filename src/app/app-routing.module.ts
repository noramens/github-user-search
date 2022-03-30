import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'home', component: FormComponent },
  { path: 'user-details/:userName', component: UserDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
