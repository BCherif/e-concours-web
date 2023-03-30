import {Route} from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {EstablishmentEmployeeResolver} from "../../../shared/resolvers/establishment.resolvers";

export const employeeRoutes: Route[] = [
    {
        path: ':establishmentId',
        component: EmployeeComponent,
        resolve: {
            item: EstablishmentEmployeeResolver
        },
    }
];
