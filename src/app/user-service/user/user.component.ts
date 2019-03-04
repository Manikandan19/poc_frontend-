import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanDeactivateComponents } from 'src/app/interfaces/can-deactivate-components';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, CanDeactivateComponents {

  constructor(private router: Router) { }

  userName: any = '';
  scrHeight: any = '';

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
    this.userName = localStorage.getItem('user');
  }

  ngDoCheck(): void {
    console.log(document.body.scrollHeight);
    console.log(document.getElementById("left"));
    this.scrHeight = document.documentElement.scrollHeight;
    document.getElementById("left").style.height = this.scrHeight;
  }

  logout() {
    return this.router.navigate(['/login']);
  }

  confirm() {
    return confirm("Do you want to exit ??");
  }

}
