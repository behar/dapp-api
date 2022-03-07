import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  

  constructor(public accountSvc: AccountService) {}

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  login() {
    // console.log(this.model);
    this.accountSvc.login(this.model).subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.accountSvc.logout();
  }

  // getCurrentUser(){
  //   this.accountSvc.currentUser$.subscribe(user => {
  //     this.model.username = user?.username;
  //     this.loggedIn = !!user;
  //   }, error => {
  //     console.log(error);
      
  //   })
  // }
}
