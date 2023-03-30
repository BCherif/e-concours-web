import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {TranslocoModule} from '@ngneat/transloco';
import {SharedModule} from 'app/shared/shared.module';
import {employeeRoutes} from "./employee.routing";
import {EmployeeComponent} from "./employee.component";
import {EmployeeFormComponent} from "./employee-form/employee-form.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DialogModule} from "@angular/cdk/dialog";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        EmployeeComponent,
        EmployeeFormComponent
    ],
    imports: [
        RouterModule.forChild(employeeRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTooltipModule,
        SharedModule,
        DialogModule,
        MatDialogModule,
        TranslocoModule,
        SharedModule
    ]
})
export class EmployeeModule {
}
