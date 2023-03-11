import {Establishment} from "./establishment.model";
import {Folder} from "./folder.model";
import {Entity} from "../_core/entity";

export class Competition extends Entity{
    title: string;
    deadline: Date;
    competitionDate: Date;
    quotation: number;
    state: boolean;
    establishment: Establishment;
    folders: Folder[];
}
