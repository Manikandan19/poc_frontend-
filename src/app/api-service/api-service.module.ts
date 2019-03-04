import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApiServiceRoutingModule } from './api-service-routing.module';
import { ApiComponent } from './api/api.component';


@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    ApiServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    NgxSpinnerModule
  ]
})
export class ApiServiceModule { }
