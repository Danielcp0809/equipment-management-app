import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: any;
  constructor(private msalService: MsalService, private router: Router) {}
  
  public GetAccessToken(): Observable<any>{
    const token = sessionStorage.getItem('msal.idtoken');
    if(token !== undefined && token!== null){
      this.accessToken = token
    }
    return this.accessToken
  }

  public login(){
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account);
      this.router.navigate(['/users'])
    });
  }

  public logout(){
    this.msalService.logout();
  }

  public getCurrentUserInfo(){
    const user = this.msalService.instance.getActiveAccount();
    return user
  }
}
