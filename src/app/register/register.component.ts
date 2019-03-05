import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsComponent } from '../alerts/alerts.component';
import { UtilityService } from '../service/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public isDisable: Boolean = false;
  public response: any = '';
  public alert: Boolean = false;

  constructor(private dialog: MatDialog,private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private router: Router, private utility: UtilityService) { }

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
    this.setValues();
  }


  setValues() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      forename: ['', Validators.required],
      middlename: [''],
      surname: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      addressDetails: this.formBuilder.group({
        flatNo: ['', Validators.required],
        landmark: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        pincode: ['', Validators.required]
      })
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  get address() {
    return this.f.addressDetails;
  }

  onSubmit() {
    var isValid = this.registerForm.status;
    this.spinner.show();

    var requestBody = {
      "details": {
        "userName": this.f.name.value,
        "foreName": this.f.forename.value,
        "middleName": this.f.middlename.value,
        "surName": this.f.surname.value,
        "dob": this.f.dob.value,
        "gender": this.f.sex.value,
        "age": this.f.age.value,
        "password": this.f.password.value
      },
      "address": {
        "flatNo": this.address.value.flatNo,
        "landMark": this.address.value.landmark,
        "street": this.address.value.street,
        "city": this.address.value.city,
        "state": this.address.value.state,
        "country": this.address.value.country,
        "zipCode": this.address.value.pincode
      }
    }

    if (isValid === "VALID") {
      this.utility.saveUserDetails(requestBody).subscribe((data) => {
        if (data) {
          this.response = "Registered Successfully";
          if (this.response) {
            this.spinner.hide();
            this.alert = true;
            const reqData = {
              "response": this.response,
              "alert":this.alert
            }
            this.onCreate(reqData);
          }
         
        }
        else {
          this.response = " Username is Already  Exists...!!!";
          if (this.response) {
            this.spinner.hide();
            this.alert = false;
            const reqData = {
              "response": this.response,
              "alert":this.alert
            }
            this.onCreate(reqData);
          }
        }


      },
        (err) => {
          this.response = "Request processing failed";
          if (this.response) {
            this.spinner.hide();
            this.alert = false;
            const reqData = {
              "response": this.response,
              "alert":this.alert
            }
            this.onCreate(reqData);
          }
        });
    }

    else{
      this.response = "Please Enter All The Mandatory Fields ....!";
          if (this.response) {
            this.spinner.hide();
            this.alert = false;
            const reqData = {
              "response": this.response,
              "alert":this.alert
            }
            this.onCreate(reqData);
          }
    }

  }

  isNumber(event): boolean {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  getBack() {
    return this.router.navigate(['/']);
  }


  onCreate(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      "response": data.response,
      "alert": data.alert
    }
    this.dialog.open(AlertsComponent, dialogConfig);
  }

}
