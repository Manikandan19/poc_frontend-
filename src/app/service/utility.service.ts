import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserInfo } from '../model/userInformation';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  public hostname: any = '';

  constructor(private http: HttpClient) {
    this.hostname = environment.url;
    console.log(environment.url);
  }

  checkCredentails(requestBody: User) {
    return this.http.post(`${this.hostname}/check`, requestBody);
  }

  saveUserDetails(requestBody: any) {
    return this.http.post<UserInfo>(`${this.hostname}/register`, requestBody);
  }

  getUserDetails(requestBody: any) {
    return this.http.post<UserInfo>(`${this.hostname}/getUserDetails`, requestBody);
  }

  updateUserDetails(requestBody: any) {
    console.log(requestBody);
    return this.http.post<UserInfo>(`${this.hostname}/update`, requestBody);
  }

}
