import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpProgressState} from './http-progress-state';
import {delay, finalize, retryWhen, take, tap} from 'rxjs/operators';
import {HttpStateService} from './http-state.service';
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";
import {token} from "../utils/econcours.utils";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    private exceptions: string[] = [];

    constructor(
        private httpStateService: HttpStateService,
        private _toastr: ToastrService) {

    }

    /**
     * Intercepts all requests
     * - in case of an error (network errors included) it repeats a request 3 times
     * - all other error can be handled an error specific case
     * and redirects into specific error pages if necessary
     *
     * There is an exception getList for specific URL patterns that we don't want the application to act
     * automatically
     *
     * The interceptor also reports back to the httpStateService when a certain requests started and ended
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let modifiedReq = request.clone({});
        modifiedReq = modifiedReq.clone({
            headers: this.httpHeaders()
        });

        if (!this.exceptions.every((term: string) => modifiedReq.url.indexOf(term) === -1)) {
            return next.handle(modifiedReq).pipe(tap((response: any) => {
                    if (response instanceof HttpResponse) {
                    }
                },
                (error) => {
                }));
        }

        this.httpStateService.state.next({
            url: modifiedReq.url,
            state: HttpProgressState.start
        });

        return next.handle(modifiedReq).pipe(retryWhen(
            error => {
                return error.pipe(take(3), delay(1500),
                    tap((response: any) => {
                        // ...logic based on response type
                        // i.e redirect on 403
                        // or feed the error on a toaster etc
                        if (!response) {
                            this._toastr.error(environment.ERROR_NETWORK_MESSAGE);
                        } else {
                            if (response['ok'] && response['ok'] === false) {
                                this._toastr.error(response['message']);
                            } else {
                                this._toastr.error(environment.ERROR_NETWORK_MESSAGE);
                            }
                        }
                    })
                );
            }
        ), finalize(() => {
            this.httpStateService.state.next({
                url: modifiedReq.url,
                state: HttpProgressState.end
            });
        }));
    }


    httpHeaders(): HttpHeaders {
        if (token) {
            return new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Content-Type, Accept, Authorization, X-Requested-With, remember-me',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'key=' + token
            });
        } else {
            return new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Content-Type, Accept, Authorization, X-Requested-With, remember-me',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
        }
    }
}
