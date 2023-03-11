import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Establishment} from "../models/establishment.model";
import {IResponse} from "../http/response";

@Injectable({
    providedIn: 'root'
})
export class EstablishmentService {
    private _establishments: BehaviorSubject<IResponse | null> = new BehaviorSubject(null);
    readonly apiUrl: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this.apiUrl = environment.API_SERVICE_URL + '/establishments';
    }

    /**
     * Getter for establishments
     */
    get establishments$(): Observable<IResponse> {
        return this._establishments.asObservable();
    }

    /**
     * Get establishments
     */
    getEstablishments(page?, size?, query?): Observable<IResponse> {
        page = page || 0;
        size = size || 10;
        return this._httpClient.get<IResponse>(this.apiUrl + '/page?page=' + page + '&size=' + size + '&query=' + query, {}).pipe(
            tap((establishments) => {
                this._establishments.next(establishments);
            })
        );
    }


    save(establishment: Establishment) {
        return this._httpClient.post(this.apiUrl, establishment, {});
    }

    update(uid: string, establishment: Establishment) {
        return this._httpClient.put(this.apiUrl + '/' + uid, establishment, {});
    }

    findOne(uid: string): Observable<IResponse> {
        return this._httpClient.get<IResponse>(this.apiUrl + '/findOne/' + uid, {})
    }

    findAll(): Observable<Establishment[]> {
        return this._httpClient.get<Establishment[]>(this.apiUrl, {});
    }
}


