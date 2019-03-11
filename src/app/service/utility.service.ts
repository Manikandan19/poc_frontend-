import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { UserInfo } from '../model/userInformation';
import { environment } from 'src/environments/environment';
import { Configuration } from '../config/configuration';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  public config: any = '';
  public hostname: any = '';

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.hostname = `${environment.name}host`;
    configuration.hostname = this.hostname;
    console.log(configuration.hostname);
  }




  checkCredentails(requestBody: User) {
    return this.http.post(`${this.configuration.hostname}/check`, requestBody);
  }

  saveUserDetails(requestBody: any) {
    return this.http.post<UserInfo>(`${this.configuration.hostname}/register`, requestBody);
  }

  getUserDetails(requestBody: any) {
    return this.http.post<UserInfo>(`${this.configuration.hostname}/getUserDetails`, requestBody);
  }

  updateUserDetails(requestBody: any) {
    console.log(requestBody);
    return this.http.post<UserInfo>(`${this.configuration.hostname}/update`, requestBody);
  }

}
