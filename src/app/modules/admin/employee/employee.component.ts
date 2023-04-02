import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {Employee} from "../../../shared/models/employee.model";
import {EmployeeService} from "../../../shared/services/employee.service";
import {IResponse} from "../../../shared/http/response";
import {EstablishmentService} from "../../../shared/services/establishment.service";
import {Establishment} from "../../../shared/models/establishment.model";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeFormComponent} from "./employee-form/employee-form.component";

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    employees: Employee[] = [];
    establishment: Establishment;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _employeeService: EmployeeService,
        protected _establishmentService: EstablishmentService,
        private _matDialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get the item
        this._establishmentService.establishment$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: IResponse) => {
                // Get the item
                this.establishment = response.data;
                if (this.establishment) {
                    this.getEmployeesByEstablishmentUid(this.establishment.uid);
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    getEmployeesByEstablishmentUid(uid: string) {
        this._employeeService.findEmployeesByEstablishmentUid(uid).subscribe((value: IResponse) => {
            if (value.ok) {
                this.employees = value.data;
                console.log(this.employees);
            }
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Open establishment dialog
     */
    addEmployeeDialog(establishment: Establishment): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(EmployeeFormComponent, {
            data: {
                establishment: establishment
            }
        });

        dialogRef.afterClosed()
            .subscribe((establishment: Establishment) => {
                if (establishment) {
                    this.getEmployeesByEstablishmentUid(this.establishment?.uid);
                }
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

}
