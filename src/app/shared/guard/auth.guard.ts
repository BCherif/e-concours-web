import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TOKEN_KEY} from "../utils/econcours.utils";

@Injectable({
    providedIn: 'root'
})
export class CoreAuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(TOKEN_KEY)) {
            return true;
        } else {
            this.router.navigate(['/sign-in']);
        }
    }

}
