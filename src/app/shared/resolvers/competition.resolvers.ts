import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IResponse} from "../http/response";
import {CompetitionService} from "../services/competition.service";

@Injectable({
    providedIn: 'root'
})
export class CompetitionResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _competitionService: CompetitionService) {
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
        return this._competitionService.getCompetitions();
    }
}

