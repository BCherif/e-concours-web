import {BehaviorSubject, Observable} from 'rxjs';
import {Entity} from './entity';
import {Injectable} from '@angular/core';

export class UserCredential {
    username: string;
    password: string;
}

export class CoreUser extends Entity {
    username?: string;
}

export interface CurrentUserAware<T extends CoreUser> {
    setCurrentUser(user: T);
}

@Injectable({
    providedIn: 'root'
})
export class DefaultCurrentUserAware implements CurrentUserAware<CoreUser> {
    userBehaviorSubject$ = new BehaviorSubject<CoreUser>(null);
    _user$: Observable<CoreUser> = null;
    private __CU__ = '__cu__';

    protected constructor() {
        this._user$ = this.userBehaviorSubject$.asObservable();
    }

    setCurrentUser(user: CoreUser) {
        this.userBehaviorSubject$.next(user);
        localStorage.setItem(this.__CU__, JSON.stringify(user));
    }

    get user$() {
        if (this.userBehaviorSubject$.getValue()) {
            return this.userBehaviorSubject$.asObservable();
        }

        const user = this.parseData(localStorage.getItem(this.__CU__));
        this.setCurrentUser(user);

        return this.userBehaviorSubject$.asObservable();
    }

    private parseData(data) {
        try {
            return data ? JSON.parse(data) : data;
        } catch (e) {
            return null;
        }
    }
}
