import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IResponse} from "../http/response";
import {EmployeeSaveEntity} from "../wrapper/employee.save.entity";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    readonly apiUrl: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this.apiUrl = environment.API_SERVICE_URL + '/employees';
    }


    findEmployeesByEstablishmentUid(establishmentUid: string): Observable<IResponse> {
        return this._httpClient.get<IResponse>(this.apiUrl + '/by-establishmentUid/' + establishmentUid, {})
    }

    create(employeeSaveEntity: EmployeeSaveEntity): Observable<IResponse> {
        return this._httpClient.post<IResponse>(this.apiUrl + "/create", employeeSaveEntity, {});
    }

}


