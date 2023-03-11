import {Injectable} from '@angular/core';
import {IHttpState} from './http-progress-state';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpStateService {

    isLoading = new Subject<boolean>();
    public state = new BehaviorSubject<IHttpState>({} as IHttpState);

    constructor() {
    }

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }
}
