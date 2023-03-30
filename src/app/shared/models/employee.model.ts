import {Entity} from "../_core/entity";
import {Establishment} from "./establishment.model";

export class Employee extends Entity {
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    job: string;
    establishment: Establishment
}
