import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../model/user';
import { UtilityService } from '../service/utility.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private utility: UtilityService, private spinner: NgxSpinnerService, private snackbar: MatSnackBar, private router: Router,private auth:AuthService) { }

  ngOnInit() {

  }

  public userName: any = '';
  public password: any = '';
  public isDisable: Boolean = false;
  public response: any = '';
  public alert: Boolean = false;


  onLogin() {
    this.spinner.show();
    var requestData: User = null;
   
    localStorage.setItem("user",this.userName);

    requestData = {
      "userName": this.userName,
      "password": this.password
    }
    this.utility.checkCredentails(requestData).subscribe((data) => {
      if (data) {
          this.spinner.hide();
          this.auth.isLoggedIn=true;
          return this.router.navigate(['/api-service']);
      }
      else {
        this.response = "Invalid User ! Please enter valid User Credentials";
        if (this.response) {
          this.spinner.hide();
          this.isDisable = true;
          this.alert = false;
        }
      }


    },
      (err) => {
        this.response = "Request processing failed";
        if (this.response) {
          this.spinner.hide();
          this.isDisable = true;
          this.alert = false;
        }
      });
  }





  
}
