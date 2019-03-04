import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { UserInfo } from '../model/userInformation';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) {
  }




  checkCredentails(requestBody: User) {
    return this.http.post('http://localhost:8080/check', requestBody);
  }

  checkUserDetails(requestBody: UserInfo) {
    return this.http.post('http://localhost:8080/', requestBody);
  }

  saveUserDetails(requestBody: any) {
    return this.http.post('http://localhost:8080/register', requestBody);
  }

  getUserDetails(requestBody: any) {
    return this.http.post('http://localhost:8080/getUserDetails', requestBody);
  }

  updateUserDetails(requestBody: any) {
    console.log(requestBody);
    return this.http.post('http://localhost:8080/update', requestBody);
  }

}
