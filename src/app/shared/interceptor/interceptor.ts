import {Injectable, Provider} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {LocalStorageTokenProvider, TokenHelper} from "../_core/token";
import {TOKEN_KEY} from "../utils/econcours.utils";
import {Paths} from "../_core/paths";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    protected constructor(private tokenProvider: LocalStorageTokenProvider,
                          private tokenHelper: TokenHelper,
                          private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenProvider.provide(TOKEN_KEY);
        const url = this.getBaseUrl(this.router.url);
        const loginPath = Paths.authenticationPath;

        if (url === loginPath) {
            return next.handle(req);
        }

        const headers = req.headers.set('Authorization', `Bearer ${token}`);
        req = req.clone({headers});

        return next
            .handle(req)
            .pipe(catchError(this.handleError(token, loginPath)));
    }

    private handleError = (token, loginPath) => (error) => {
        if (this.tokenHelper.isExpired(token)) {
            localStorage.removeItem(TOKEN_KEY);
            this.router.navigate([loginPath], {queryParams: {returnUrl: this.router?.url}}).then()
        }
        return throwError(error);
    }

    private getBaseUrl(url) {
        const urlTree = this.router?.parseUrl(url);
        return urlTree?.root?.children['primary']?.segments?.map(it => it.path).join('/');
    }
}


export const AUTH_TOKEN_INTERCEPTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
} as Provider;
