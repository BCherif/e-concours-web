import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IResponse} from "../http/response";
import {ResultSaveEntity} from "../wrapper/result.save.entity";

@Injectable({
    providedIn: 'root'
})
export class ResultService {
    readonly apiUrl: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this.apiUrl = environment.API_SERVICE_URL + '/results';
    }


    create(resultSaveEntity: ResultSaveEntity): Observable<IResponse> {
        return this._httpClient.post<IResponse>(this.apiUrl + "/create", resultSaveEntity, {});
    }

}


