import {Candidacy} from "../models/candidacy.model";

export class ResultSaveEntity {
    title: string;
    competitionTitle: string;
    competitionUid: string;
    establishmentTitle: string;
    establishmentUid: string;
    candidacies: Candidacy[];
}
