import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CompetitionsComponent} from "./competitions.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRippleModule} from "@angular/material/core";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DialogModule} from "@angular/cdk/dialog";
import {MatDialogModule} from "@angular/material/dialog";
import {QuillModule} from "ngx-quill";
import {competitionsRoutes} from "./competitions.routing";
import {SharedModule} from "../../../../shared/shared.module";
import {CompetitionFormComponent} from "./competition-form/competition-form.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatLuxonDateModule} from "@angular/material-luxon-adapter";
import {FuseHighlightModule} from "../../../../../@fuse/components/highlight";

@NgModule({
    declarations: [
        CompetitionsComponent,
        CompetitionFormComponent
    ],
    imports: [
        RouterModule.forChild(competitionsRoutes),
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
        DialogModule,
        MatDialogModule,
        QuillModule.forRoot(),
        MatStepperModule,
        SharedModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatLuxonDateModule,
        FuseHighlightModule
    ]
})
export class CompetitionsModule {
}
