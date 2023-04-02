import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AcceptedCandidaciesComponent} from "./accepted-candidacies.component";
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
import {SharedModule} from "../../../shared/shared.module";
import {DialogModule} from "@angular/cdk/dialog";
import {MatDialogModule} from "@angular/material/dialog";
import {QuillModule} from "ngx-quill";
import {AcceptedCandidacyResolver} from "../../../shared/resolvers/candidacy.resolvers";

const candidaciesRoutes: Route[] = [
    {
        path: ':competitionUid',
        component: AcceptedCandidaciesComponent,
        resolve: {
            item: AcceptedCandidacyResolver,
        }
    }
];

@NgModule({
    declarations: [
        AcceptedCandidaciesComponent
    ],
    imports: [
        RouterModule.forChild(candidaciesRoutes),
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
        QuillModule.forRoot(),
    ]
})
export class AcceptedCandidaciesModule {
}
