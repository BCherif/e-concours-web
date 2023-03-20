import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CandidaciesComponent} from "./candidacies.component";
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
import {CandidacyResolvers} from "../../../shared/resolvers/candidacy.resolvers";
import {FlexLayoutModule} from "@angular/flex-layout";

const candidaciesRoutes: Route[] = [
    {
        path: '',
        component: CandidaciesComponent,
        resolve: {
            candidacies: CandidacyResolvers,
        }
    }
];

@NgModule({
    declarations: [
        CandidaciesComponent
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
        FlexLayoutModule,
    ]
})
export class CandidaciesModule {
}
