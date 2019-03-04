import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/service/utility.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {

  public registerForm: FormGroup;
  public isDisable: Boolean = false;
  public response: any = '';
  public alert: Boolean = false;

  public userDetails: any = null;

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private snackbar: MatSnackBar, private router: Router, private utility: UtilityService) { }

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
    this.setValues();
    this.setFormValue();
  }




  setValues() {
    this.registerForm = this.formBuilder.group({
      userId: [''],
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
        addressID: [''],
        flatNo: ['', Validators.required],
        landMark: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', Validators.required]
      })
    });
  }

  setFormValue() {
    var userCrendentials: User = {
      userName: localStorage.getItem('user'),
      password: null
    }
    this.utility.getUserDetails(userCrendentials).subscribe((data) => {
      if (data) {
        this.userDetails = data;
        this.f.userId.setValue(this.userDetails.details.userId);
        this.f.name.setValue(this.userDetails.details.userName);
        this.f.forename.setValue(this.userDetails.details.foreName);
        this.f.middlename.setValue(this.userDetails.details.middleName);
        this.f.surname.setValue(this.userDetails.details.surName);
        this.f.dob.setValue(this.userDetails.details.dob);
        this.f.sex.setValue(this.userDetails.details.gender);
        this.f.age.setValue(this.userDetails.details.age);
        this.f.password.setValue(this.userDetails.details.password);
        this.f.confirmpassword.setValue(this.userDetails.details.password);
        this.address.setValue(this.userDetails.address);
      }
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
      "id": this.f.userId.value,
      "details": {
        "userId": this.f.userId.value,
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
        "addressID": this.address.value.addressID,
        "flatNo": this.address.value.flatNo,
        "landMark": this.address.value.landMark,
        "street": this.address.value.street,
        "city": this.address.value.city,
        "state": this.address.value.state,
        "country": this.address.value.country,
        "zipCode": this.address.value.zipCode
      }
    }

    if (isValid === "VALID") {
      this.utility.updateUserDetails(requestBody).subscribe((data) => {
        if (data) {
          this.response = " UserDetails updated successfully";
          if (this.response) {
            this.spinner.hide();
            this.isDisable = true;
            this.alert = true;
          }
        }
        else {
          this.response = " Request processing failed";
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

    else {
      this.response = "Request processing failed";
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
    return this.router.navigate(['/api-service/user/user-details']);
  }

}
