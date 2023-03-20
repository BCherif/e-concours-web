import {Candidate} from "./candidate.model";
import {Competition} from "./competition.model";
import {STATE_CANDIDACY} from "../enums/enumeration";

export class Candidacy {
    candidate: Candidate;
    competition: Competition;
    state: STATE_CANDIDACY;
    note: string;
    attachments: any[];
}
