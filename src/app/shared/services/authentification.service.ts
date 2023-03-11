import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {IResponse} from "../http/response";
import {TOKEN_KEY} from "../utils/econcours.utils";
import {UserCredential} from "../_core/auth";

@Injectable({
    providedIn: 'root',
})
export class AuthentificationService {

    readonly API_SERVICE_URL: string = environment.API_SERVICE_URL;

    constructor(protected httpClient: HttpClient) {

    }

    login(credentials: UserCredential): Observable<IResponse> {
        const url = `${this.API_SERVICE_URL}/login`;
        return this.httpClient.post<IResponse>(url, credentials);
    }

    logout() {
        try {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem('__cu__');
            return Promise.resolve(true);
        } catch (e) {
            return Promise.reject();
        }
    }
}
