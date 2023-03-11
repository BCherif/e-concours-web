import {Route} from '@angular/router';
import {CompetitionsComponent} from "./competitions.component";
import {CompetitionResolver} from "../../../../shared/resolvers/competition.resolvers";
import {CompetitionFormComponent} from "./competition-form/competition-form.component";

export const competitionsRoutes: Route[] = [
    {
        path: '',
        component: CompetitionsComponent,
        resolve: {
            data: CompetitionResolver
        }
    },
    {
        path: 'edit/:id',
        component: CompetitionFormComponent
    },
];
