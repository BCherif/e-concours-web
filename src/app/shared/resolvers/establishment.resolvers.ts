import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {EstablishmentService} from "../services/establishment.service";
import {IResponse} from "../http/response";

@Injectable({
    providedIn: 'root'
})
export class EstablishmentResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _establishmentService: EstablishmentService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResponse> {
        return this._establishmentService.getEstablishments();
    }
}

