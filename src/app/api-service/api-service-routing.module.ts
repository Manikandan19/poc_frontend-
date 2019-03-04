import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api/api.component';
import { ConfirmationGuard } from '../Authguard/confirmation/confirmation.guard';

const routes: Routes = [
  {
    path: 'api', component: ApiComponent,canDeactivate:[ConfirmationGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'api' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiServiceRoutingModule { }
