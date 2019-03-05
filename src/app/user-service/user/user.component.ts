import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanDeactivateComponents } from 'src/app/interfaces/can-deactivate-components';
import { UtilityService } from 'src/app/service/utility.service';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/userInformation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, CanDeactivateComponents {

  constructor(private router: Router, private utility: UtilityService) { }

  public userDetails: UserInfo = null;

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
    var userCrendentials: User = {
      userName: localStorage.getItem('user'),
      password: null
    }
    this.utility.getUserDetails(userCrendentials).subscribe((data) => {
      if (data) {
        this.userDetails = data;
      }
    });
  }

  logout() {
    return this.router.navigate(['/login']);
  }

  confirm() {
    return confirm("Do you want to exit ??");
  }

}
