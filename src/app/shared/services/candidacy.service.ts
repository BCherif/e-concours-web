import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {IResponse} from "../http/response";
import {Env} from "../utils/econcours.utils";
import {Candidacy} from "../models/candidacy.model";

@Injectable({
    providedIn: 'root'
})
export class CandidacyService {
    private _candidacies: BehaviorSubject<IResponse | null> = new BehaviorSubject(null);
    readonly apiUrl: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private env: Env) {
        this.apiUrl = environment.API_SERVICE_URL + '/candidacies';
    }


    /**
     * Getter for candidacies
     */
    get candidacies$(): Observable<IResponse> {
        return this._candidacies.asObservable();
    }

    /**
     * Get candidacies
     */
    getCandidacies(page?, size?, query?): Observable<IResponse> {
        page = page || 0;
        size = size || 10;
        return this._httpClient.get<IResponse>(this.apiUrl + '/page?page=' + page + '&size=' + size + '&query=' + query, {}).pipe(
            tap((competitions) => {
                this._candidacies.next(competitions);
            })
        );
    }


    create(obj: FormData): Observable<IResponse> {
        return this._httpClient.post<IResponse>(this.apiUrl + "/create", obj, this.env.uploadOption);
    }

    findOne(uid: string): Observable<IResponse> {
        return this._httpClient.get<IResponse>(this.apiUrl + '/findOne/' + uid, {})
    }

    downloadUrl(path: string): string {
        return this.apiUrl + "/download/" + path;
    }

    update(uid: string, candidacy: Candidacy): Observable<IResponse> {
        return this._httpClient.put<IResponse>(this.apiUrl + '/' + uid, candidacy, {})
    }

}


