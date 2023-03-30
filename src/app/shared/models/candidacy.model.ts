import {Candidate} from "./candidate.model";
import {Competition} from "./competition.model";
import {STATE_CANDIDACY} from "../enums/enumeration";
import {Entity} from "../_core/entity";

export class Candidacy extends Entity{
    candidate: Candidate;
    competition: Competition;
    state: STATE_CANDIDACY;
    note: string;
    attachments: any[];
}
