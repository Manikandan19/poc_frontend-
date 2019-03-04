import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanDeactivateComponents } from 'src/app/interfaces/can-deactivate-components';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit, CanDeactivateComponents {

  constructor(private router: Router, private location: Location) { }

  user: any = '';

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };
  }

  onLogout() {

    return this.router.navigate(['/login']);
  }

  confirm() {
    return confirm("Are you want to exit ??");
  }

}
