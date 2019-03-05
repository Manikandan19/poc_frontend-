import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { UtilityService } from '../service/utility.service';
import { AlertsComponent } from '../alerts/alerts.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private dialog: MatDialog, private utility: UtilityService, private spinner: NgxSpinnerService, private snackbar: MatSnackBar, private router: Router, private auth: AuthService) { }

  ngOnInit() {

  }

  public userName: any = '';
  public password: any = '';
  public response: any = '';
  public alert: Boolean = false;
  public isDisable: Boolean = false;


  onLogin() {
    this.spinner.show();
    var requestData: User = null;

    localStorage.setItem("user", this.userName);

    requestData = {
      "userName": this.userName,
      "password": this.password
    }

    if (this.userName == '' || this.password == '') {
      this.response = "Please Enter Valid User Credentials";
      if (this.response) {
        this.spinner.hide();
        this.isDisable = true;
        this.alert = false;
      }
    }

    else {
      this.utility.checkCredentails(requestData).subscribe((data) => {
        if (data) {
          this.spinner.hide();
          this.auth.isLoggedIn = true;
          return this.router.navigate(['/api-service']);
        }
        else {
          this.response = "Invalid User ! Please Enter Valid User Credentials";
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
            this.alert = false;
            this.isDisable = true;
          }
        });
    }
  }

}
