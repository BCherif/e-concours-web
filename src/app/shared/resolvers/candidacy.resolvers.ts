import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IResponse} from "../http/response";
import {CandidacyService} from "../services/candidacy.service";

@Injectable({
    providedIn: 'root'
})
export class CandidacyResolvers implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _candidacyService: CandidacyService) {
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
        return this._candidacyService.getCandidacies();
    }
}

