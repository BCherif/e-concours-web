import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IResponse} from "../../../../shared/http/response";
import {ToastrService} from "ngx-toastr";
import {ResultSaveEntity} from "../../../../shared/wrapper/result.save.entity";
import {ResultService} from "../../../../shared/services/result.service";
import {Router} from "@angular/router";

@Component({
    selector: 'accepted-candidacy-form',
    templateUrl: './accepted-candidacy-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AcceptedCandidacyFormComponent implements OnInit {
    resultSaveEntityForm: UntypedFormGroup;

    resultSaveEntity: ResultSaveEntity;


    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<AcceptedCandidacyFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: UntypedFormBuilder,
        private _resultService: ResultService,
        private _toast: ToastrService,
        private router: Router
    ) {
        this.resultSaveEntity = _data.resultSaveEntity;
        this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    createForm() {
        // Create the form
        this.resultSaveEntityForm = this._formBuilder.group({
            title: ['', [Validators.required]],
        });
    }


    /**
     * close
     */
    close(): void {// Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Send the message
     */
    submit() {
        this.resultSaveEntity.title = this.resultSaveEntityForm.get('title').value;
        this._resultService.create(this.resultSaveEntity).subscribe((response: IResponse) => {
            if (response.ok) {
                this._toast.success(response.message);
                this.close();
                this.router.navigate(['/competition-management/competitions']);
            }
        })
    }
}
