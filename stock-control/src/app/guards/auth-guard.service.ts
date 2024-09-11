import { Router, UrlTree } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
    {
      if (!this.userService.isLoggedIn()) {
        this.router.navigate(['/home']);
        return false
      }

      this.userService.isLoggedIn();
      return true;
    }
}
