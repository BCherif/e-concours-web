import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {IResponse} from "../http/response";
import {Competition} from "../models/competition.model";
import {Env} from "../utils/econcours.utils";

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {
    private _competitions: BehaviorSubject<IResponse | null> = new BehaviorSubject(null);
    readonly apiUrl: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private env: Env) {
        this.apiUrl = environment.API_SERVICE_URL + '/competitions';
    }


    /**
     * Getter for competitions
     */
    get competitions$(): Observable<IResponse> {
        return this._competitions.asObservable();
    }

    /**
     * Get competitions
     */
    getCompetitions(page?, size?, query?): Observable<IResponse> {
        page = page || 0;
        size = size || 10;
        return this._httpClient.get<IResponse>(this.apiUrl + '/page?page=' + page + '&size=' + size + '&query=' + query, {}).pipe(
            tap((competitions) => {
                this._competitions.next(competitions);
            })
        );
    }

    findOne(competitionId: string): Observable<IResponse> {
        return this._httpClient.get<IResponse>(this.apiUrl + '/findOne/' + competitionId, {})
    }


    update(uid: string, competition: Competition): Observable<any> {
        return this._httpClient.put<IResponse>(this.apiUrl + '/' + uid, competition, {});
    }

    create(obj: FormData): Observable<IResponse> {
        return this._httpClient.post<IResponse>(this.apiUrl + "/create", obj, this.env.uploadOption);
    }

    downloadUrl(path: string): string {
        return this.apiUrl + "/download/" + path;
    }
}


