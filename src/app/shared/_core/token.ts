import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface TokenProvider {
    provide(key?: string);
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageTokenProvider implements TokenProvider {
    provide(key?: string) {
        return localStorage.getItem(key);
    }
}

@Injectable({
    providedIn: 'root'
})
export class TokenHelper {
    protected helperService = new JwtHelperService();

    protected constructor() {}

    decode = (token) => {
        return this.helperService.decodeToken(token);
    }

    expirationDate = (token) => {
        return this.helperService.getTokenExpirationDate(token);
    }

    isExpired = (token) => {
        return this.helperService.isTokenExpired(token);
    }
}
