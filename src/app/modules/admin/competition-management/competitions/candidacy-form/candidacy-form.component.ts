import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {Competition} from "../../../../../shared/models/competition.model";
import {CompetitionService} from "../../../../../shared/services/competition.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImportFileService} from "../../../../../shared/services/ImportFileService";
import {Folder} from "../../../../../shared/models/folder.model";
import {CandidacySaveEntity} from "../../../../../shared/wrapper/candidacy.save.entity";
import {CandidacyService} from "../../../../../shared/services/candidacy.service";
import {IResponse} from "../../../../../shared/http/response";

@Component({
    selector: 'candidacy-form',
    templateUrl: './candidacy-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CandidacyFormComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;

    competition: Competition;
    candidacySaveEntity: CandidacySaveEntity = new CandidacySaveEntity();

    file: FormData = new FormData();

    documents: any [] = [];

    folders: Folder[] = [];

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder,
                private _competitionService: CompetitionService,
                private _candidacyService: CandidacyService,
                private _toast: ToastrService,
                public matDialogRef: MatDialogRef<CandidacyFormComponent>,
                private _importFileService: ImportFileService,
                @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
        this.competition = _data.competition;
        if (this.competition) {
            this.folders = this.competition.folders;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.createForm();

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    createForm() {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                lastName: ['', Validators.required],
                firstName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', Validators.required],
                address: ['', Validators.required],
                placeOfBirth: ['', Validators.required],
                username: ['', Validators.required],
                password: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                competitionId: [this.competition.uid]
            })
        });
    }

    loadDocument(folder: Folder) {
        this._importFileService.getFile("application/pdf").then(value => {
            let index = this.documents.findIndex(document => {
                return document.title == folder.title
            });
            if (index == -1) {
                this.documents.push({
                    title: folder.title,
                    file: value
                })
            } else {
                this.documents[index].file = value;
            }
        });
    }

    getFileName(title: string): string {
        let document = this.documents.find(doc => {
            return doc.title == title
        });
        if (document) {
            return document.file.name
        }
    }

    /**
     * close
     */
    close(): void {// Close the dialog
        this.matDialogRef.close();
    }

    save() {
        this.candidacySaveEntity = this.horizontalStepperForm.get('step1').value;
        this.candidacySaveEntity.competitionId = this.competition.uid;
        this.file.append('candidacy', JSON.stringify(this.candidacySaveEntity));
        this.documents.forEach(value => {
            this.file.append('files', value.file, value.title);
        });
        this._candidacyService.create(this.file).subscribe((response:IResponse) => {
            if (response.ok) {
                this.matDialogRef.close(response.data);
                this._toast.success(response.message);
            } else {
                this._toast.error(response.message);
            }
        })
    }

}
