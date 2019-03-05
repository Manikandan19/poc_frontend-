import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogIn:boolean=false;

  islogout:boolean=false;

  set isLoggedIn( islogged:boolean)
  {
    this.isLogIn=islogged;
  }

  get isLoggedIn()
  {
    return this.isLogIn;
  }

  set isLoggedOut(islogout:boolean)
  {
    this.islogout=islogout;
  }

  get isLoggedOut()
  {
    return this.islogout;
  }
  
}
