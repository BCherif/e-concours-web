import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthentificationService} from "../../../shared/services/authentification.service";
import {IResponse} from "../../../shared/http/response";
import {TOKEN_KEY} from "../../../shared/utils/econcours.utils";
import {CoreUser, DefaultCurrentUserAware} from "../../../shared/_core/auth";
import {TokenHelper} from "../../../shared/_core/token";

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthentificationService,
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private tokenHelper: TokenHelper,
        private userAware: DefaultCurrentUserAware
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        localStorage.removeItem(TOKEN_KEY);
        // Create the form
        this.signInForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        const credential = {
            username: this.signInForm.get('username').value,
            password: this.signInForm.get('password').value
        };
        this._authService
            .login(credential)
            .subscribe((response: IResponse) => {
                if (!response) {
                    this.alert = {
                        type: 'error',
                        message: 'Nom d\'utilisateur ou mot de passe incorrect'
                    };
                    // Show the alert
                    this.showAlert = true;
                } else {
                    const data = response?.data;
                    const token = data[TOKEN_KEY];
                    const decodedInfo = this.tokenHelper.decode(token);
                    const user: CoreUser = {
                        username: decodedInfo.username,
                    } as CoreUser;
                    this.userAware.setCurrentUser(user);
                    localStorage.setItem(TOKEN_KEY, data[TOKEN_KEY]);
                    this.router.navigate(['/competition-management/competitions']);
                }

            }, error => {
                const message = error?.error?.message;
                this.alert = {
                    type: 'error',
                    message: message
                };

                // Show the alert
                this.showAlert = true;
            });
    }
}
