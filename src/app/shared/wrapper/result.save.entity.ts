import {Candidacy} from "../models/candidacy.model";

export class ResultSaveEntity {
    competitionTitle: string;
    competitionUid: string;
    establishmentTitle: string;
    establishmentUid: string;
    candidacies: Candidacy[];
}
