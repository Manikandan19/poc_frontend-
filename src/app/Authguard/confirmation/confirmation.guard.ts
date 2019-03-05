import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserComponent } from 'src/app/user-service/user/user.component';



@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanDeactivate<any> {

  canDeactivate
  ( component:UserComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.confirm();
  }
  
}
