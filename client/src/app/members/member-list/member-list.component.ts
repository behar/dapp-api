import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { BusyService } from 'src/app/_services/busy.service';
import { MemberServiceService } from 'src/app/_services/member-service.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
members$: Observable<Member[]>;
  constructor(private memberSvc: MemberServiceService) { }

  ngOnInit(): void {
    // this.loadUsers();
    this.members$ = this.memberSvc.getMembers();

  }

  // loadUsers(){
  //   this.memberSvc.getMembers().subscribe(response => {
  //     this.members = response;
  //   })
  // }

}
