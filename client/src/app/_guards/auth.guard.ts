import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private accountSvc: AccountService, private toastr: ToastrService) {
    
    
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.accountSvc.currentUser$.pipe(
        map((user: User)=> {
          if (user) {
            return true;
          } else {
            this.toastr.error('no permissions to navigate!');
            return false;
          }
        })
      )
  }
  
}
