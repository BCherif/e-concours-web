import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Establishment} from "../models/establishment.model";
import {IResponse} from "../http/response";
import {Env} from "../utils/econcours.utils";

@Injectable({
    providedIn: 'root'
})
export class EstablishmentService {
    private _establishments: BehaviorSubject<IResponse | null> = new BehaviorSubject(null);
    private _establishment: BehaviorSubject<IResponse | null> = new BehaviorSubject(null);
    readonly apiUrl: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private env: Env) {
        this.apiUrl = environment.API_SERVICE_URL + '/establishments';
    }

    /**
     * Getter for establishments
     */
    get establishments$(): Observable<IResponse> {
        return this._establishments.asObservable();
    }

    get establishment$(): Observable<IResponse> {
        return this._establishment.asObservable();
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


    update(uid: string, establishment: Establishment) {
        return this._httpClient.put(this.apiUrl + '/' + uid, establishment, {});
    }

    findOne(uid: string): Observable<IResponse> {
        return this._httpClient.get<IResponse>(this.apiUrl + '/findOne/' + uid, {}).pipe(
            tap((establishment) => {
                this._establishment.next(establishment);
            })
        )
    }

    findAll(): Observable<Establishment[]> {
        return this._httpClient.get<Establishment[]>(this.apiUrl, {});
    }

    create(obj: FormData): Observable<IResponse> {
        return this._httpClient.post<IResponse>(this.apiUrl + "/create", obj, this.env.uploadOption);
    }

    downloadUrl(path: string): string {
        return this.apiUrl + "/download/" + path;
    }
}


