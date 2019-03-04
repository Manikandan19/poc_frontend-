import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/model/userInformation';
import { UtilityService } from 'src/app/service/utility.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private utility: UtilityService) { }

  public userDetails: any = null;

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
        console.log(this.userDetails);
      }
    });
  }

}
