import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IResponse} from "../../../../shared/http/response";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../../../shared/services/employee.service";
import {Establishment} from "../../../../shared/models/establishment.model";
import {EmployeeSaveEntity} from "../../../../shared/wrapper/employee.save.entity";

@Component({
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class EmployeeFormComponent implements OnInit {
    employeeForm: UntypedFormGroup;

    establishment: Establishment;
    employeeSaveEntity: EmployeeSaveEntity;
    action: string;


    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<EmployeeFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: UntypedFormBuilder,
        private _employeeService: EmployeeService,
        private _toast: ToastrService
    ) {
        this.establishment = _data.establishment;
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
        this.employeeForm = this._formBuilder.group({
            lastName: ['', Validators.required],
            firstName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            job: ['', Validators.required],
            establishmentId: [this.establishment.uid],
            username: ['', Validators.required],
            password: ['', Validators.required]
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
    send() {
        this.employeeSaveEntity = this.employeeForm.getRawValue();
        this._employeeService.create(this.employeeSaveEntity).subscribe((response: IResponse) => {
            if (response.ok) {
                this.matDialogRef.close(response.data);
                this._toast.success(response.message);
            } else {
                this._toast.error(response.message);
            }
        })

    }
}
