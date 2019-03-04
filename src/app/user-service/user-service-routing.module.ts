import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { ConfirmationGuard } from '../Authguard/confirmation/confirmation.guard';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, children: [
      { path: 'user-details', component: UserDetailsComponent },
      { path: 'edit-details', component: EditUserDetailsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'user-details' }
    ],canDeactivate:[ConfirmationGuard]
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserServiceRoutingModule { }
