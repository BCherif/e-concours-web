import {HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

/*export const TOKEN_KEY = '__ac__';
export const token = localStorage.getItem(TOKEN_KEY);*/

export const TOKEN_KEY = '__ac__';
const token = localStorage.getItem(TOKEN_KEY);
const AUTHORIZATION = token ? {Authorization: `Bearer ${token}`} : {};

@Injectable({
    providedIn: 'root'
})
export class Env {

    get defaultMessage() {
        return 'Une erreur inconnue est survenue';
    }

    get httpHeaders() {
        let headers = new HttpHeaders();
        if (token) { // token is present
            headers = headers.set('Authorization', 'Bearer ' + token);
        }
        return {
            headers: headers
        };
    }

    get uploadOption() {
        let _headers = new HttpHeaders();
        if (token) {
            _headers = _headers.set('enctype', 'multipart/form-data');
            _headers = _headers.set('Authorization', 'Bearer ' + token);
        }
        return {headers: _headers};
    }
}
