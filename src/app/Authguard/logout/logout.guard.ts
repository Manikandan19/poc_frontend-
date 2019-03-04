import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private auth: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isLoggedIn;
  }

}
