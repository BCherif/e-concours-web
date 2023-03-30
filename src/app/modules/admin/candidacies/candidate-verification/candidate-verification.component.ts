import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from "ngx-toastr";
import {Candidacy} from "../../../../shared/models/candidacy.model";
import {CandidacyService} from "../../../../shared/services/candidacy.service";
import {STATE_CANDIDACY} from "../../../../shared/enums/enumeration";
import {IResponse} from "../../../../shared/http/response";

@Component({
    selector: 'candidate-verification',
    templateUrl: './candidate-verification.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CandidateVerificationComponent implements OnInit {
    candidacyForm: UntypedFormGroup;

    candidacy: Candidacy;

    state = STATE_CANDIDACY;
    status: string;
    states: any[];

    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
            ['clean']
        ]
    };

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CandidateVerificationComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: UntypedFormBuilder,
        protected _candidacyService: CandidacyService,
        private _toast: ToastrService
    ) {
        this.candidacy = _data.candidacy;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.states = Object.keys(this.state);
        this.checkForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    checkForm() {
        // Create the form
        this.candidacyForm = this._formBuilder.group({
            uid: [this.candidacy?.uid],
            competition: new FormControl({value: this.candidacy?.competition?.title, disabled: true}),
            firstName: new FormControl({value: this.candidacy?.candidate?.firstName, disabled: true}),
            lastName: new FormControl({value: this.candidacy?.candidate?.lastName, disabled: true}),
            email: new FormControl({value: this.candidacy?.candidate?.email, disabled: true}),
            phone: new FormControl({value: this.candidacy?.candidate?.phone, disabled: true}),
            placeOfBirth: new FormControl({value: this.candidacy?.candidate?.placeOfBirth, disabled: true}),
            address: new FormControl({value: this.candidacy?.candidate?.address, disabled: true}),
            state: new FormControl({value: this.candidacy?.state, disabled: true}),
            note: [''],
        });
    }

    /**
     * close
     */
    close(): void {// Close the dialog
        this.matDialogRef.close();
    }

    update(state: string) {
        this.status = state;
        if (this.status == 'Refuser') {
            this.candidacy.state = this.states[1];
            this.candidacy.note = this.candidacyForm.get('note').value;
            this._candidacyService.update(this.candidacy.uid,this.candidacy).subscribe((ret:IResponse) => {
                if (ret.ok) {
                    this.matDialogRef.close(ret.data);
                    this._toast.success(ret.message);
                } else {
                    this._toast.error(ret.message);
                }
            }, error => {
                this._toast.error('Une erreur est survenue');
            })
        }else if (this.status == 'Instance') {
            this.candidacy.state = this.states[2];
            this._candidacyService.update(this.candidacy.uid,this.candidacy).subscribe((ret:IResponse) => {
                if (ret.ok) {
                    this.matDialogRef.close(ret.data);
                    this._toast.success(ret.message);
                } else {
                    this._toast.error(ret.message);
                }
            }, error => {
                this._toast.error('Une erreur est survenue');
            })
        }else {
            this.candidacy.state = this.states[0];
            this._candidacyService.update(this.candidacy.uid,this.candidacy).subscribe((ret:IResponse) => {
                if (ret.ok) {
                    this.matDialogRef.close(ret.data);
                    this._toast.success(ret.message);
                } else {
                    this._toast.error(ret.message);
                }
            }, error => {
                this._toast.error('Une erreur est survenue');
            })
        }

    }


}
