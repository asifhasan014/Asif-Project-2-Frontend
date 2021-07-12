import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from './constants'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}	
    canActivate(
            next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                if(localStorage.getItem(Constants.IsLoggedIn) === null)
                {
                    this.router.navigate(['/login']);
                    return true;
                }
                else if (localStorage.getItem(Constants.IsLoggedIn)) {
                    var currentTime = new Date().getTime();
                    // return true;
                    var lastActiveTime =  localStorage.getItem(Constants.LastActiveTime);
                    if(lastActiveTime!=null && lastActiveTime!="")
                        var lastActiveTimeLong = Number(lastActiveTime);
                    else
                        var lastActiveTimeLong = -1;
                    
                    
                    /*console.log("Current Time " + currentTime);
                    console.log("last active Time " + lastActiveTimeLong);
                    console.log("time difference "+ (currentTime - lastActiveTimeLong)/1000);
                    console.log("Second "+ (Constants.SessionTimeOutInSec - Constants.SessionOutWarningTimeInSec));*/
                    if(lastActiveTimeLong<=0)
                    {
                        
                        this.router.navigate(['/login']);
                        return true;
                    }
                    else
                    {
                        if(((currentTime - lastActiveTimeLong)/1000) > Constants.SessionTimeOutInSec)
                        {
                            this.router.navigate(['/login']);
                            return true;
                        }
                        else
                            
                        {
                            localStorage.setItem(Constants.LastActiveTime,""+currentTime);
                            return true;
                        } 
                    }
                    //return true;
                }
                else
                {
                    this.router.navigate(['/login']);
                    return true;
                }
                /*if (localStorage.getItem(Constants.IsLoggedIn)) {
                    return true;
                }
                this.router.navigate(['/login']);
                return true;*/
                
            }
}
