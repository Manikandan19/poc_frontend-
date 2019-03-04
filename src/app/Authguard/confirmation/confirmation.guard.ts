import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiComponent } from 'src/app/api-service/api/api.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<any> {

  canDeactivate
  ( component:ApiComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.confirm();
  }
  
}
