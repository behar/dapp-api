import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberServiceService } from 'src/app/_services/member-service.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
members: Member[];
  constructor(private memberSvc: MemberServiceService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.memberSvc.getMembers().subscribe(response => {
      this.members = response;
    })
  }

}
