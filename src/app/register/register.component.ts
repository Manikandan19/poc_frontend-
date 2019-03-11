import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private snackbar: MatSnackBar, private router: Router, private utility: UtilityService) { }

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
          this.response = " UserDetails registered successfully";
          if (this.response) {
            this.spinner.hide();
            this.isDisable = true;
            this.alert = true;
          }
         
        }
        else {
          this.response = " Username is already  Exists...!!!";
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

    else{
      this.response = "Please enter the mandatory fielsds....!";
          if (this.response) {
            this.spinner.hide();
            this.isDisable = true;
            this.alert = false;
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
}
