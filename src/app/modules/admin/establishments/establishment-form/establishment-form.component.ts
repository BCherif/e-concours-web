import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Establishment} from "../../../../shared/models/establishment.model";
import {EstablishmentService} from "../../../../shared/services/establishment.service";
import {IResponse} from "../../../../shared/http/response";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'establishment-form',
    templateUrl: './establishment-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class EstablishmentFormComponent implements OnInit {
    establishmentForm: UntypedFormGroup;

    establishment: Establishment;
    action: string;

    file: FormData = new FormData();

    imageFile: any;

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
        public matDialogRef: MatDialogRef<EstablishmentFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: UntypedFormBuilder,
        private _establishmentService: EstablishmentService,
        private _toast: ToastrService
    ) {
        this.action = _data.action;
        if (this.action === 'edit') {
            this.establishment = _data.establishment;
        } else {
            this.establishment = new Establishment();
        }
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
        this.establishmentForm = this._formBuilder.group({
            uid: [this.establishment?.uid],
            name: [this.establishment?.name, [Validators.required]],
            description: [this.establishment?.description],
        });
    }

    loadFiles(event) {
        this.imageFile = event.target.files[0];
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
    send() {
        this.establishment = this.establishmentForm.getRawValue();
        if (!this.establishment.uid) {
            this.file.append('establishment', JSON.stringify(this.establishment));
            this.file.append('imageUrl', this.imageFile);
            this._establishmentService.create(this.file).subscribe((response: IResponse) => {
                if (response.ok) {
                    this.matDialogRef.close(response.data);
                    this._toast.success(response.message);
                } else {
                    this._toast.error(response.message);
                }
            })
        } else {
            this._establishmentService.update(this.establishment.uid, this.establishment).subscribe((response: IResponse) => {
                if (response.ok) {
                    this.matDialogRef.close(response.data);
                    this._toast.success(response.message);
                } else {
                    this._toast.error(response.message);
                }
            })
        }

    }
}
